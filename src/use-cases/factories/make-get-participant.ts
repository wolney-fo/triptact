import { PrismaParticipantsRepository } from "../../repositories/prisma/prisma-participants-repository";
import { GetParticipantUseCase } from "../get-participant";

export function makeGetParticipantUseCase() {
  const participantsRepository = new PrismaParticipantsRepository();
  const useCase = new GetParticipantUseCase(participantsRepository);

  return useCase;
}
