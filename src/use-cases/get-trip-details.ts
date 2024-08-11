import { Prisma, Trip } from "@prisma/client";
import { TripsRepository } from "../repositories/trips-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetTripDetailsUseCaseRequest {
  tripId: string;
}

interface GetTripDetailsUseCaseResponse {
  trip: {
    id: string;
    destination: string;
    starts_at: Date;
    ends_at: Date;
    is_confirmed: boolean;
  };
}

export class GetTripDetailsUseCase {
  constructor(private tripsUseCase: TripsRepository) {}

  async execute({
    tripId,
  }: GetTripDetailsUseCaseRequest): Promise<GetTripDetailsUseCaseResponse> {
    const trip = await this.tripsUseCase.findById(tripId);

    if (!trip) {
      throw new ResourceNotFoundError();
    }

    return {
      trip: {
        id: trip.id,
        destination: trip.destination,
        starts_at: trip.starts_at,
        ends_at: trip.ends_at,
        is_confirmed: trip.is_confirmed,
      },
    };
  }
}
