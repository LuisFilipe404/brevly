import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/link";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { eq } from "drizzle-orm";
import z from "zod";
import { AliasAlreadyExists } from "./errors/alias-already-exists";

const createNewShortLinkSchema = z.object({
  id: z.uuid().optional(),
  originalUrl: z.url().min(1),
  shortUrl: z.string().min(1).max(15),
});

export type CreateNewShortLinkInput = z.output<typeof createNewShortLinkSchema>;

export type CreateNewShortLinkOutput = {
  id: string;
  originalUrl: string;
  shortUrl: string;
};

export const createNewShortLink = async (
  input: CreateNewShortLinkInput
): Promise<Either<Error, CreateNewShortLinkOutput>> => {
  const { id, shortUrl, originalUrl } = createNewShortLinkSchema.parse(input);

  const aliasAlreadyUsed = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, shortUrl));

  if (aliasAlreadyUsed.length > 0) {
    return makeLeft(new AliasAlreadyExists());
  }

  const newShortLink = await db
    .insert(links)
    .values({
      id,
      originalUrl,
      shortUrl: shortUrl,
    })
    .returning({ id: links.id });

  return makeRight({
    id: newShortLink[0].id,
    shortUrl: shortUrl,
    originalUrl,
  });
};
