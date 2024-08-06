import { PrismaParticipantsRepository } from "../../repositories/prisma/prisma-participants-repository";
import { GetParticipantsUseCase } from "../get-participants";

export function makeGetParticipantsUseCase() {
  const participantsRepository = new PrismaParticipantsRepository();
  const useCase = new GetParticipantsUseCase(participantsRepository);

  return useCase;
}
