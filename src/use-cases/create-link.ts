import { Link } from "@prisma/client";
import { LinksRepository } from "../repositories/links-repository";
import { TripsRepository } from "../repositories/trips-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateLinkUseCaseRequest {
  title: string;
  url: string;
  tripId: string;
}

interface CreateLinkUseCaseResponse {
  link: Link;
}

export class CreateLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private tripsRepository: TripsRepository
  ) {}

  async execute({
    title,
    url,
    tripId,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const trip = await this.tripsRepository.findById(tripId);

    if (!trip) {
      throw new ResourceNotFoundError();
    }

    const link = await this.linksRepository.create({
      title,
      url,
      trip_id: tripId,
    });

    return { link };
  }
}
