import { PrismaParticipantsRepository } from "../../repositories/prisma/prisma-participants-repository";
import { PrismaTripsRepository } from "../../repositories/prisma/prisma-trips-repository";
import { CreateInviteUseCase } from "../create-invite";

export function makeCreateInviteUseCase() {
  const tripsRepository = new PrismaTripsRepository();
  const participantsRepository = new PrismaParticipantsRepository();
  const useCase = new CreateInviteUseCase(
    tripsRepository,
    participantsRepository
  );

  return useCase;
}
