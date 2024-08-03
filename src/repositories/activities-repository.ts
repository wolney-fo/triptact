import { Prisma, Activity } from "@prisma/client";

export interface ActivitiesRepository {
  findById(id: string): Promise<Activity | null>;
  getByTripId(tripId: string): Promise<Activity[] | null>;
  create(data: Prisma.ActivityUncheckedCreateInput): Promise<Activity>;
}
