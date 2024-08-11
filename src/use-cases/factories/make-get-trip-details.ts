import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { GetTripDetailsUseCase } from "../get-trip-details";

export function makeGetTripDetailsUseCase() {
  const tripsRepository = new PrismaTripsRepository();
  const useCase = new GetTripDetailsUseCase(tripsRepository);

  return useCase;
}
