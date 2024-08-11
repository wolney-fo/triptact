import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetActivitiesUseCase } from "../../use-cases/factories/make-get-activities";

export async function getByTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/activities",
    {
      schema: {
        summary: "Gets an activity.",
        tags: ["Activities"],
        params: z.object({
          tripId: z.string(),
        }),
        response: {
          200: z.object({
            activities: z.array(
              z.object({
                date: z.date(),
                activities: z.array(
                  z.object({
                    id: z.string().uuid(),
                    title: z.string(),
                    occurs_at: z.date(),
                    trip_id: z.string(),
                  })
                ),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;

      const getActivitiesUseCase = makeGetActivitiesUseCase();

      const { activities } = await getActivitiesUseCase.execute({ tripId });

      return reply.status(200).send({ activities });
    }
  );
}
