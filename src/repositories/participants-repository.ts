import { Participant, Prisma } from "@prisma/client";

export interface ParticipantsRepository {
  findById(id: string): Promise<Participant | null>;
  confirm(id: string): Promise<void>;
  getByTripId(tripId: string): Promise<Participant[]>;
  create(data: Prisma.ParticipantUncheckedCreateInput): Promise<Participant>;
}
