import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getByTrip } from "./get-by-trip";

export async function activitiesRoutes(app: FastifyInstance) {
  app.register(create);
  app.register(getByTrip);
}
