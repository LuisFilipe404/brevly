import {
  createNewShortLink,
  type CreateNewShortLinkInput,
} from "@/functions/create-new-short-link";
import { AliasAlreadyExists } from "@/functions/errors/alias-already-exists";
import { isLeft, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const createNewShortLinkRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.post("/links", async (request, reply) => {
    const body = request.body as CreateNewShortLinkInput;

    const result = await createNewShortLink(body);

    if (isLeft(result)) {
      const error = unwrapEither(result);

      switch (error.constructor) {
        case AliasAlreadyExists:
          return reply.status(409).send({ message: error.message });
        default:
          return reply.status(500).send({ message: "Internal server error." });
      }
    }

    return unwrapEither(result);
  });
};
