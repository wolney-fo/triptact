import { FastifyInstance } from "fastify";
import { create } from "./create";
import { confirm } from "./confirm";

export async function tripsRoutes(app: FastifyInstance) {
  app.register(create);
  app.register(confirm);
}
