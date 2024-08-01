import { Prisma } from "@prisma/client";

export type TripWithParticipants = Prisma.TripGetPayload<{
  include: {
    participants: true;
  };
}>;
