import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { CreateTripUseCase } from "../create-trip";

export function makeCreateTripUseCase() {
  const tripsRepository = new PrismaTripsRepository();
  const useCase = new CreateTripUseCase(tripsRepository);

  return useCase;
}
