import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getByTrip } from "./get-by-trip";

export async function linksRoutes(app: FastifyInstance) {
  app.register(create);
  app.register(getByTrip);
}
