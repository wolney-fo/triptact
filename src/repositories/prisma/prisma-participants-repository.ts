import { Prisma } from "@prisma/client";
import { ParticipantsRepository } from "../participants-repository";
import { prisma } from "../../lib/prisma";

export class PrismaParticipantsRepository implements ParticipantsRepository {
  async create(data: Prisma.ParticipantUncheckedCreateInput) {
    const participant = await prisma.participant.create({
      data,
    });

    return participant;
  }
}
