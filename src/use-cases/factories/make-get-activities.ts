import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { GetActivitiesUseCase } from "../get-activities";

export function makeGetActivitiesUseCase() {
  const tripsRepository = new PrismaTripsRepository();
  const useCase = new GetActivitiesUseCase(tripsRepository);

  return useCase;
}
