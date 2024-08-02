import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeCreateActivityUseCase } from "../../use-cases/factories/make-create-activity";

export async function create(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string(),
          occurs_at: z.coerce.date(),
        }),
        response: {
          201: z.object({
            activityId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { title, occurs_at } = request.body;

      const createActivityUseCase = makeCreateActivityUseCase();

      const { activity } = await createActivityUseCase.execute({
        title,
        occurs_at,
        tripId,
      });

      return { activityId: activity.id };
    }
  );
}
