import { FastifyInstance } from "fastify";
import { confirm } from "./confirm";

export async function participantsRoutes(app: FastifyInstance) {
  app.register(confirm);
}
