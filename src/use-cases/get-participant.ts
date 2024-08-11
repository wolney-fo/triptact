import { Participant } from "@prisma/client";
import { ParticipantsRepository } from "../repositories/participants-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetParticipantUseCaseRequest {
  participantId: string;
}

interface GetParticipantUseCaseResponse {
  participant: {
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
  };
}

export class GetParticipantUseCase {
  constructor(private participantsRepository: ParticipantsRepository) {}

  async execute({
    participantId,
  }: GetParticipantUseCaseRequest): Promise<GetParticipantUseCaseResponse> {
    const participant = await this.participantsRepository.findById(
      participantId
    );

    if (!participant) {
      throw new ResourceNotFoundError();
    }

    return {
      participant: {
        name: participant.name,
        id: participant.id,
        email: participant.email,
        is_confirmed: participant.is_confirmed,
      },
    };
  }
}
