import { FastifyInstance } from "fastify";
import { serviceStatus } from "./service/service-status";

export async function appRoutes(app: FastifyInstance) {
  app.register(serviceStatus);
}
