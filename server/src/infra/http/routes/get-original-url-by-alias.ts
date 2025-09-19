import { AliasNotExists } from "@/functions/errors/alias-not-exists";
import { getOriginalUrl } from "@/functions/get-original-url";
import { isLeft, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

type GetOriginalUrlByAliasInput = {
  alias: string;
};

export const getOriginalUrlByAlias: FastifyPluginAsyncZod = async (server) => {
  server.get("/links/original-url/:alias", async (request, reply) => {
    const { alias } = request.params as GetOriginalUrlByAliasInput;

    const result = await getOriginalUrl(alias);

    if (isLeft(result)) {
      const error = unwrapEither(result);

      switch (error.constructor) {
        case AliasNotExists:
          return reply.status(404).send({ message: error.message });
        default:
          return reply.status(500).send({ message: "Internal server error." });
      }
    }

    return unwrapEither(result);
  });
};
