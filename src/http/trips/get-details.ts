import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetTripDetailsUseCase } from "../../use-cases/factories/make-get-trip-details";

export async function getDetails(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            trip: z.object({
              id: z.string().uuid(),
              destination: z.string(),
              starts_at: z.date(),
              ends_at: z.date(),
              is_confirmed: z.boolean(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;

      const getTripDetailsUseCase = makeGetTripDetailsUseCase();

      const { trip } = await getTripDetailsUseCase.execute({ tripId });

      return reply.status(200).send({ trip });
    }
  );
}
