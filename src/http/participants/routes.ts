import { FastifyInstance } from "fastify";
import { confirm } from "./confirm";
import { getByTrip } from "./get-by-trip";

export async function participantsRoutes(app: FastifyInstance) {
  app.register(confirm);
  app.register(getByTrip);
}
