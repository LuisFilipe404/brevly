import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { createNewShortLinkRoute } from "./routes/create-new-short-link";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { listAllShortLinks } from "./routes/list-all-short-links";
import { deleteShortLink } from "./routes/delete-short-link";
import { getOriginalUrlByAlias } from "./routes/get-original-url-by-alias";
import { env } from "@/env";
import { createReport } from "./routes/create-report";

const server = fastify();

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "DELETE", "POST"],
});

server.register(createNewShortLinkRoute);
server.register(listAllShortLinks);
server.register(deleteShortLink);
server.register(getOriginalUrlByAlias);
server.register(createReport);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
