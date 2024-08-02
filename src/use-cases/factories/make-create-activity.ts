import { PrismaActivitiesRepository } from "../../repositories/prisma/prisma-activities-repository";
import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { CreateActivityUseCase } from "../create-activity";

export function makeCreateActivityUseCase() {
  const activitiesRepository = new PrismaActivitiesRepository();
  const tripsRepository = new PrismaTripsRepository();
  const useCase = new CreateActivityUseCase(
    activitiesRepository,
    tripsRepository
  );

  return useCase;
}
