import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeCreateLinkUseCase } from "../../use-cases/factories/make-create-link";

export async function create(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/links",
    {
      schema: {
        summary: "Creates a link.",
        tags: ["Links"],
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string(),
          url: z.string().url(),
        }),
        response: {
          201: z.object({
            linkId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { title, url } = request.body;

      const createLinkUseCase = makeCreateLinkUseCase();

      const { link } = await createLinkUseCase.execute({ title, url, tripId });

      return reply.status(201).send({ linkId: link.id });
    }
  );
}
