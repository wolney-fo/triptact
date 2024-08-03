import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function linksRoutes(app: FastifyInstance) {
  app.register(create);
}
