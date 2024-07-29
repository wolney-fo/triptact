import { FastifyInstance } from "fastify";
import { serviceStatus } from "./service/service-status";
import { tripsRoutes } from "./trips/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(serviceStatus);
  app.register(tripsRoutes);
}
