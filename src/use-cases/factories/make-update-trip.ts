import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { UpdateTripUseCase } from "../update-trip";

export function makeUpdateTripUseCase() {
  const tripsRepository = new PrismaTripsRepository();
  const useCase = new UpdateTripUseCase(tripsRepository);

  return useCase;
}
