import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/link";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { eq } from "drizzle-orm";
import { AliasNotExists } from "./errors/alias-not-exists";

export type getOriginalUrl = {
  originalUrl: string;
};

export const getOriginalUrl = async (
  alias: string
): Promise<Either<Error, getOriginalUrl>> => {
  const url = await db.select().from(links).where(eq(links.shortUrl, alias));

  if (!url || url.length === 0) {
    return makeLeft(new AliasNotExists());
  }

  await db
    .update(links)
    .set({ accessCount: url[0].accessCount + 1 })
    .where(eq(links.id, url[0].id));

  return makeRight({
    originalUrl: url[0].originalUrl,
  });
};
