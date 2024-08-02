import { FastifyInstance } from "fastify";
import { activitiesRoutes } from "./activities/routes";
import { participantsRoutes } from "./participants/routes";
import { serviceStatus } from "./service/service-status";
import { tripsRoutes } from "./trips/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(activitiesRoutes);
  app.register(participantsRoutes);
  app.register(serviceStatus);
  app.register(tripsRoutes);
}
