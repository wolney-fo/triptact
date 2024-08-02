import { Activity } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import dayjs from "../lib/dayjs";
import { ActivitiesRepository } from "../repositories/activities-repository";
import { TripsRepository } from "../repositories/trips-repository";
import { InvalidStartDateError } from "../errors/invalid-start-date-error";

interface CreateActivityUseCaseRequest {
  title: string;
  occurs_at: Date;
  tripId: string;
}

interface CreateActivityUseCaseResponse {
  activity: Activity;
}

export class CreateActivityUseCase {
  constructor(
    private activitiesRepository: ActivitiesRepository,
    private tripsRepository: TripsRepository
  ) {}

  async execute({
    title,
    occurs_at,
    tripId,
  }: CreateActivityUseCaseRequest): Promise<CreateActivityUseCaseResponse> {
    const trip = await this.tripsRepository.findById(tripId);

    if (!trip) {
      throw new ResourceNotFoundError();
    }

    if (dayjs(occurs_at).isBefore(trip.starts_at)) {
      throw new InvalidStartDateError();
    }

    if (dayjs(occurs_at).isAfter(trip.ends_at)) {
      throw new InvalidStartDateError();
    }

    const activity = await this.activitiesRepository.create({
      title,
      occurs_at,
      trip_id: tripId,
    });

    return { activity };
  }
}
