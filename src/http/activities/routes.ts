import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function activitiesRoutes(app: FastifyInstance) {
  app.register(create);
}
