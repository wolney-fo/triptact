import { FastifyInstance } from "fastify";
import { confirm } from "./confirm";
import { createInvite } from "./create-invite";
import { getByTrip } from "./get-by-trip";

export async function participantsRoutes(app: FastifyInstance) {
  app.register(confirm);
  app.register(createInvite);
  app.register(getByTrip);
}
