import { env } from "../env";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { ParticipantsRepository } from "../repositories/participants-repository";

interface ConfirmParticipantUseCaseRequest {
  participantId: string;
}

interface ConfirmParticipantUseCaseResponse {
  tripURL: string;
}

export class ConfirmParticipantUseCase {
  constructor(private participantsRepository: ParticipantsRepository) {}

  async execute({
    participantId,
  }: ConfirmParticipantUseCaseRequest): Promise<ConfirmParticipantUseCaseResponse> {
    const participant = await this.participantsRepository.findById(
      participantId
    );

    if (!participant) {
      throw new ResourceNotFoundError();
    }

    if (participant.is_confirmed) {
      return { tripURL: `${env.WEB_BASE_URL}/trips/${participant.trip_id}` };
    }

    await this.participantsRepository.confirm(participantId);

    return { tripURL: `${env.WEB_BASE_URL}/trips/${participant.trip_id}` };
  }
}
