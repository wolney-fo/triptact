import { FastifyInstance } from "fastify";
import { create } from "./create";
import { confirm } from "./confirm";
import { update } from "./update";

export async function tripsRoutes(app: FastifyInstance) {
  app.register(create);
  app.register(confirm);
  app.register(update);
}
