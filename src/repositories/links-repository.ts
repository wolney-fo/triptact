import { Prisma, Link } from "@prisma/client";

export interface LinksRepository {
  findById(id: string): Promise<Link | null>;
  getByTripId(tripId: string): Promise<Link[]>;
  create(data: Prisma.LinkUncheckedCreateInput): Promise<Link>;
}
