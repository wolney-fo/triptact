import { Prisma, Trip } from "@prisma/client";
import { TripWithParticipants } from "../@types/trip-with-participants";
import { TripWithActivities } from "../@types/trip-with-activities";

export interface TripsRepository {
  findById(id: string): Promise<Trip | null>;
  findByIdWithInvitedParticipants(
    id: string
  ): Promise<TripWithParticipants | null>;
  findByIdWithActivities(id: string): Promise<TripWithActivities | null>;
  confirm(id: string): Promise<void>;
  create(data: Prisma.TripCreateInput): Promise<Trip>;
  update(id: string, data: Prisma.TripUpdateInput): Promise<Trip>;
}
