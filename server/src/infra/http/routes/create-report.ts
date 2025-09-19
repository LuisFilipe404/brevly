import { exportLinks } from "@/functions/export-uploads";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const createReport: FastifyPluginAsyncZod = async (server) => {
  server.post("/links/uploads", async (request, reply) => {
    const result = await exportLinks();

    const { reportUrl } = unwrapEither(result);

    return reply.status(200).send({ url: reportUrl });
  });
};
