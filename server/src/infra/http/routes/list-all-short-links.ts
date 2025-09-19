import { GetAllShortLinks } from "@/functions/get-all-short-links";
import { isLeft, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const listAllShortLinks: FastifyPluginAsyncZod = async (server) => {
  server.get("/links", async (request, reply) => {
    const result = await GetAllShortLinks();

    if (isLeft(result)) {
      const error = unwrapEither(result);

      switch (error.constructor) {
        default:
          return reply.status(500).send({ message: "Internal server error." });
      }
    }

    return unwrapEither(result);
  });
};
