import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { env } from "../env";
import { InvalidTripStartDate } from "../errors/invalid-trip-start-date";
import { InvalidTripEndDate } from "../errors/invalid-trip-end-date";

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
    error instanceof InvalidTripStartDate ||
    error instanceof InvalidTripEndDate
  ) {
    return reply.status(400).send({ message: error.message });
  }

  return reply.status(500).send({ message: "Internal server error." });
};
