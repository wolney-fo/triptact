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

  async create(data: Prisma.LinkCreateInput) {
    const link = await prisma.link.create({
      data,
    });

    return link;
  }
}
