import { Link } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { LinksRepository } from "../repositories/links-repository";

interface GetLinksUseCaseRequest {
  tripId: string;
}

interface GetLinksUseCaseResponse {
  links: Link[];
}

export class GetLinksUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    tripId,
  }: GetLinksUseCaseRequest): Promise<GetLinksUseCaseResponse> {
    const links = await this.linksRepository.getByTripId(tripId);

    if (links.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { links };
  }
}
