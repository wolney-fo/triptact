import { Activity } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import dayjs from "../lib/dayjs";
import { TripsRepository } from "../repositories/trips-repository";

interface GetActivitiesUseCaseRequest {
  tripId: string;
}

interface GetActivitiesUseCaseResponse {
  activities: { date: Date; activities: Activity[] }[];
}

export class GetActivitiesUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    tripId,
  }: GetActivitiesUseCaseRequest): Promise<GetActivitiesUseCaseResponse> {
    const trip = await this.tripsRepository.findByIdWithActivities(tripId);

    if (!trip) {
      throw new ResourceNotFoundError();
    }

    const differenceInDaysBetweenStartAndEnd = dayjs(trip.ends_at).diff(
      trip.starts_at,
      "days"
    );

    const activities = Array.from({
      length: differenceInDaysBetweenStartAndEnd + 1,
    }).map((_, index) => {
      const date = dayjs(trip.starts_at).add(index, "days");

      return {
        date: date.toDate(),
        activities: trip.activities.filter((activity) => {
          return dayjs(activity.occurs_at).isSame(date, "day");
        }),
      };
    });

    return { activities };
  }
}
