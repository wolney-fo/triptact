import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function serviceStatus(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/health",
    {
      schema: {
        summary: "Verifies the service status.",
        tags: ["Service"],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      return reply.status(200).send({ message: "Server is ready." });
    }
  );
}
