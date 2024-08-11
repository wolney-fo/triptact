import { Trip } from "@prisma/client";
import { InvalidEndDateError } from "../errors/invalid-end-date-error";
import { InvalidStartDateError } from "../errors/invalid-start-date-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import dayjs from "../lib/dayjs";
import { TripsRepository } from "../repositories/trips-repository";

interface UpdateTripUseCaseRequest {
  tripId: string;
  destination: string;
  starts_at: Date;
  ends_at: Date;
}

interface UpdateTripUseCaseResponse {
  trip: Trip;
}

export class UpdateTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    tripId,
    destination,
    starts_at,
    ends_at,
  }: UpdateTripUseCaseRequest): Promise<UpdateTripUseCaseResponse> {
    const trip = await this.tripsRepository.findById(tripId);

    if (!trip) {
      throw new ResourceNotFoundError();
    }

    if (dayjs(starts_at).isBefore(new Date())) {
      throw new InvalidStartDateError();
    }

    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new InvalidEndDateError();
    }

    await this.tripsRepository.update(tripId, {
      destination,
      starts_at,
      ends_at,
    });

    return { trip };
  }
}
