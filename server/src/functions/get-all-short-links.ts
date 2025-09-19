import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/link";
import { makeRight, type Either } from "@/shared/either";
import { desc } from "drizzle-orm";

type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
};

export type GetAllShortLinksOutput = {
  links: Link[];
};

export const GetAllShortLinks = async (): Promise<
  Either<Error, GetAllShortLinksOutput>
> => {
  const ownLinksRows = await db
    .select()
    .from(links)
    .orderBy(desc(links.createdAt));

  const ownLinks = ownLinksRows.map((row) => ({
    id: row.id,
    originalUrl: row.originalUrl,
    shortUrl: row.shortUrl,
    accessCount: row.accessCount,
  }));

  return makeRight({
    links: ownLinks,
  });
};
