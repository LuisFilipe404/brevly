import { db, pg } from "@/infra/db";
import { links } from "@/infra/db/schemas/link";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";
import { PassThrough, Transform } from "stream";
import { pipeline } from "stream/promises";

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
  const { sql, params } = db
    .select({
      originalUrl: links.originalUrl,
      shortUrl: links.shortUrl,
      createdAt: links.createdAt,
      accessCount: links.accessCount,
    })
    .from(links)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(2);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      {
        key: "original_url",
        header: "URL Original",
      },
      {
        key: "short_url",
        header: "URL Encurtada",
      },
      {
        key: "access_count",
        header: "Quantidade de Acessos",
      },
      {
        key: "created_at",
        header: "Data de Criação",
      },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const converToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, converToCSVPipeline]);

  return makeRight({
    reportUrl: url,
  });
}
