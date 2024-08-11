import { FastifyInstance } from "fastify";
import { confirm } from "./confirm";
import { create } from "./create";
import { getDetails } from "./get-details";
import { update } from "./update";

export async function tripsRoutes(app: FastifyInstance) {
  app.register(confirm);
  app.register(create);
  app.register(getDetails);
  app.register(update);
}
