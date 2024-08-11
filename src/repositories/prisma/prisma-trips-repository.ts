import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TripsRepository } from "../trips-repository";

export class PrismaTripsRepository implements TripsRepository {
  async findById(id: string) {
    const trip = await prisma.trip.findUnique({
      where: {
        id,
      },
    });

    return trip;
  }

  async findByIdWithInvitedParticipants(id: string) {
    const trip = await prisma.trip.findUnique({
      where: {
        id,
      },
      include: {
        participants: {
          where: {
            is_owner: false,
          },
        },
      },
    });

    return trip;
  }

  async findByIdWithActivities(id: string) {
    const trip = await prisma.trip.findUnique({
      where: {
        id,
      },
      include: {
        activities: {
          orderBy: {
            occurs_at: "asc",
          },
        },
      },
    });

    return trip;
  }

  async confirm(id: string) {
    await prisma.trip.update({
      where: { id },
      data: {
        is_confirmed: true,
      },
    });
  }

  async create(data: Prisma.TripCreateInput) {
    const trip = await prisma.trip.create({
      data,
    });

    return trip;
  }

  async update(id: string, data: Prisma.TripUpdateInput) {
    const trip = await prisma.trip.update({
      where: {
        id,
      },
      data,
    });

    return trip;
  }
}
