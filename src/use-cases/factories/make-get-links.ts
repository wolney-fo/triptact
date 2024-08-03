import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { GetLinksUseCase } from "../get-links";

export function makeGetLinksUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const useCase = new GetLinksUseCase(linksRepository);

  return useCase;
}
