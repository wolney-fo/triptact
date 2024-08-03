import { Prisma } from "@prisma/client";

export type TripWithActivities = Prisma.TripGetPayload<{
  include: {
    activities: true;
  };
}>;
