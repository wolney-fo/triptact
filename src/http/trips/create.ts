import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeCreateTripUseCase } from "../../use-cases/factories/make-create-trip";

export async function create(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email()),
        }),
        response: {
          201: z.object({
            tripId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const {
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite,
      } = request.body;

      const createTripUSeCase = makeCreateTripUseCase();

      const { trip } = await createTripUSeCase.execute({
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite,
      });

      return reply.status(201).send({ tripId: trip.id });
    }
  );
}
