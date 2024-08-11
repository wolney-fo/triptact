import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeUpdateTripUseCase } from "../../use-cases/factories/make-update-trip";

export async function update(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId",
    {
      schema: {
        summary: "Updates a trip.",
        tags: ["Trips"],
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          destination: z.string(),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
        response: {
          200: z.object({
            tripId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { destination, starts_at, ends_at } = request.body;

      const updateTripUseCase = makeUpdateTripUseCase();

      const { trip } = await updateTripUseCase.execute({
        tripId,
        destination,
        starts_at,
        ends_at,
      });

      return reply.status(200).send({ tripId: trip.id });
    }
  );
}
