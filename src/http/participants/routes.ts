import { FastifyInstance } from "fastify";
import { confirm } from "./confirm";
import { createInvite } from "./create-invite";
import { get } from "./get";
import { getByTrip } from "./get-by-trip";

export async function participantsRoutes(app: FastifyInstance) {
  app.register(confirm);
  app.register(createInvite);
  app.register(get);
  app.register(getByTrip);
}
