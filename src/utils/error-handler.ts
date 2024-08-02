import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { env } from "../env";
import { InvalidEndDateError } from "../errors/invalid-end-date-error";
import { InvalidStartDateError } from "../errors/invalid-start-date-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.flatten().fieldErrors,
    });
  }

  if (
    error instanceof InvalidStartDateError ||
    error instanceof InvalidEndDateError
  ) {
    return reply.status(400).send({ message: error.message });
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: "Not found." });
  }

  return reply.status(500).send({ message: "Internal server error." });
};
