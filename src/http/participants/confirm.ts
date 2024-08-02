import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeConfirmParticipantUseCase } from "../../use-cases/factories/make-confirm-participant";

export async function confirm(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId/confirm",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params;
      const confirmParticipantUseCase = makeConfirmParticipantUseCase();

      const { tripURL } = await confirmParticipantUseCase.execute({
        participantId,
      });

      return reply.redirect(tripURL);
    }
  );
}
