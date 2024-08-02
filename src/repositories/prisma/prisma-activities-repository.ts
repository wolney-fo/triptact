import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ActivitiesRepository } from "../activities-repository";

export class PrismaActivitiesRepository implements ActivitiesRepository {
  async findById(id: string) {
    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    return activity;
  }

  async create(data: Prisma.ActivityUncheckedCreateInput) {
    const activity = await prisma.activity.create({
      data,
    });

    return activity;
  }
}
