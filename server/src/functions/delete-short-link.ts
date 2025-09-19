import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/link";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import { eq } from "drizzle-orm";
import { LinkNotExists } from "./errors/link-not-exists";

export type DeleteShortLinkOutput = {
  message: string;
};

export const DeleteShortLink = async (
  id: string
): Promise<Either<Error, DeleteShortLinkOutput>> => {
  const link = await db.select().from(links).where(eq(links.id, id));

  if (!link) {
    return makeLeft(new LinkNotExists());
  }

  await db.delete(links).where(eq(links.id, id));

  return makeRight({
    message: "Link deletado com sucesso.",
  });
};
