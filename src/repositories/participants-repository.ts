import { Participant, Prisma } from "@prisma/client";

export interface ParticipantsRepository {
  findById(id: string): Promise<Participant | null>;
  confirm(id: string): Promise<void>;
  create(data: Prisma.ParticipantUncheckedCreateInput): Promise<Participant>;
}
