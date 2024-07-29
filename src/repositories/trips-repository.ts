import { Prisma, Trip } from "@prisma/client";

export interface TripsRepository {
  create(data: Prisma.TripCreateInput): Promise<Trip>;
}
