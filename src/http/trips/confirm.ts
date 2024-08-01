import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeConfirmTripUseCase } from "../../use-cases/factories/make-confirm-trip";

export async function confirm(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;

      const confirmTripUseCase = makeConfirmTripUseCase();

      const { tripURL } = await confirmTripUseCase.execute({ tripId });

      return reply.redirect(tripURL);
    }
  );
}
