import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetParticipantsUseCase } from "../../use-cases/factories/make-get-participants";

export async function getByTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/participants",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            participants: z.array(
              z.object({
                id: z.string(),
                name: z.string().nullish(),
                email: z.string(),
                is_confirmed: z.boolean(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;

      const getParticipantsUseCase = makeGetParticipantsUseCase();

      const { participants } = await getParticipantsUseCase.execute({ tripId });

      return reply.status(200).send({ participants });
    }
  );
}
