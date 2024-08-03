import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { CreateLinkUseCase } from "../create-link";

export function makeCreateLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const tripsRepository = new PrismaTripsRepository();
  const useCase = new CreateLinkUseCase(linksRepository, tripsRepository);

  return useCase;
}
