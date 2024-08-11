import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetParticipantUseCase } from "../../use-cases/factories/make-get-participant";

export async function get(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId",
    {
      schema: {
        summary: "Gets details of a participant.",
        tags: ["Participants"],
        params: z.object({
          participantId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            participant: z.object({
              id: z.string().uuid(),
              name: z.string().nullable(),
              email: z.string().email(),
              is_confirmed: z.boolean(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { participantId } = request.params;

      const getParticipantUseCase = makeGetParticipantUseCase();

      const { participant } = await getParticipantUseCase.execute({
        participantId,
      });

      return reply.status(200).send({ participant });
    }
  );
}
