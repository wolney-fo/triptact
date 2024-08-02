import { Prisma } from "@prisma/client";
import { ParticipantsRepository } from "../participants-repository";
import { prisma } from "../../lib/prisma";

export class PrismaParticipantsRepository implements ParticipantsRepository {
  async findById(id: string) {
    const participant = await prisma.participant.findUnique({
      where: { id },
    });

    return participant;
  }

  async confirm(id: string) {
    await prisma.participant.update({
      where: { id },
      data: {
        is_confirmed: true,
      },
    });
  }

  async create(data: Prisma.ParticipantUncheckedCreateInput) {
    const participant = await prisma.participant.create({
      data,
    });

    return participant;
  }
}
