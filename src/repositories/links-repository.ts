import { Prisma, Link } from "@prisma/client";

export interface LinksRepository {
  findById(id: string): Promise<Link | null>;
  create(data: Prisma.LinkCreateInput): Promise<Link>;
}
