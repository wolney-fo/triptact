import { Prisma, Trip } from "@prisma/client";
import { TripWithParticipants } from "../@types/trip-with-participants";

export interface TripsRepository {
  findById(id: string): Promise<Trip | null>;
  findByIdWithInvitedParticipants(
    id: string
  ): Promise<TripWithParticipants | null>;
  confirm(id: string): Promise<void>;
  create(data: Prisma.TripCreateInput): Promise<Trip>;
}
