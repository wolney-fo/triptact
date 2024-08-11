import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetLinksUseCase } from "../../use-cases/factories/make-get-links";

export async function getByTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/links",
    {
      schema: {
        summary: "Gets a link.",
        tags: ["Links"],
        params: z.object({
          tripId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                url: z.string().url(),
                trip_id: z.string().uuid(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;

      const getLinksUseCase = makeGetLinksUseCase();

      const { links } = await getLinksUseCase.execute({ tripId });

      return reply.status(200).send({ links });
    }
  );
}
