import { PrismaParticipantsRepository } from "../../repositories/prisma/prisma-participants-repository";
import { ConfirmParticipantUseCase } from "../confirm-participant";

export function makeConfirmParticipantUseCase() {
  const participantsRepository = new PrismaParticipantsRepository();
  const useCase = new ConfirmParticipantUseCase(participantsRepository);

  return useCase;
}
