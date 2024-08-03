import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { LinksRepository } from "../links-repository";

export class PrismaLinksRepository implements LinksRepository {
  async findById(id: string) {
    const link = await prisma.link.findUnique({
      where: { id },
    });

    return link;
  }

  async getByTripId(tripId: string) {
    const links = await prisma.link.findMany({
      where: {
        trip_id: tripId,
      },
    });

    return links;
  }

  async create(data: Prisma.LinkUncheckedCreateInput) {
    const link = await prisma.link.create({
      data,
    });

    return link;
  }
}
