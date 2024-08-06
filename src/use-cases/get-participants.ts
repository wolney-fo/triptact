import { Participant } from "@prisma/client";
import { ParticipantsRepository } from "../repositories/participants-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetParticipantsUseCaseRequest {
  tripId: string;
}

interface GetParticipantsUseCaseResponse {
  participants: Participant[];
}

export class GetParticipantsUseCase {
  constructor(private participantsRepository: ParticipantsRepository) {}

  async execute({
    tripId,
  }: GetParticipantsUseCaseRequest): Promise<GetParticipantsUseCaseResponse> {
    const participants = await this.participantsRepository.getByTripId(tripId);

    if (participants.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { participants };
  }
}
