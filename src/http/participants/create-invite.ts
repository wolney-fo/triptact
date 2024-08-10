import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeCreateInviteUseCase } from "../../use-cases/factories/make-create-invite";

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            participantId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { email } = request.body;

      const createInviteUseCase = makeCreateInviteUseCase();

      const { participant } = await createInviteUseCase.execute({
        tripId,
        email,
      });

      return reply.status(201).send({ participantId: participant.id });
    }
  );
}
