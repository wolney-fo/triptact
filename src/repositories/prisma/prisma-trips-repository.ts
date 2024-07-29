import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TripsRepository } from "../trips-repository";

export class PrismaTripsRepository implements TripsRepository {
  async create(data: Prisma.TripCreateInput) {
    const trip = await prisma.trip.create({
      data,
    });

    return trip;
  }
}
