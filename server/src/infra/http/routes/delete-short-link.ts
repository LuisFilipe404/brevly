import { DeleteShortLink } from "@/functions/delete-short-link";
import { isLeft, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

type Params = {
  id: string;
};

export const deleteShortLink: FastifyPluginAsyncZod = async (server) => {
  server.delete("/links/:id", async (request, reply) => {
    console.log("chegou aqui");
    const { id } = request.params as Params;

    const result = await DeleteShortLink(id);

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
