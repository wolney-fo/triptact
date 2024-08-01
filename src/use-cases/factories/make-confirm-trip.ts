import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { ConfirmTripUseCase } from "../confirm-trip";

export function makeConfirmTripUseCase() {
  const tripsRepository = new PrismaTripsRepository();
  const useCase = new ConfirmTripUseCase(tripsRepository);

  return useCase;
}
