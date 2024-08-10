import nodemailer from "nodemailer";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import dayjs from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { ParticipantsRepository } from "../repositories/participants-repository";
import { TripsRepository } from "../repositories/trips-repository";
import { getInviteEmailBody } from "../utils/html-email-bodies/invite-email";
import { Participant } from "@prisma/client";

interface CreateInviteUseCaseRequest {
  tripId: string;
  email: string;
}

interface CreateInviteUseCaseResponse {
  participant: Participant;
}

export class CreateInviteUseCase {
  constructor(
    private tripsRepository: TripsRepository,
    private participantsRepository: ParticipantsRepository
  ) {}

  async execute({
    tripId,
    email,
  }: CreateInviteUseCaseRequest): Promise<CreateInviteUseCaseResponse> {
    const trip = await this.tripsRepository.findById(tripId);

    if (!trip) {
      throw new ResourceNotFoundError();
    }

    const participant = await this.participantsRepository.create({
      email,
      trip_id: tripId,
    });

    const formattedStartDate = dayjs(trip.starts_at).format("LL");
    const formattedEndDate = dayjs(trip.ends_at).format("LL");

    const mail = await getMailClient();

    const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`;

    const message = await mail.sendMail({
      from: {
        name: "TripTact Trips",
        address: "trips@triptact.com",
      },
      to: participant.email,
      subject: `Confirm your travel to ${trip.destination} on ${formattedStartDate}`,
      html: getInviteEmailBody({
        destination: trip.destination,
        formattedStartDate,
        formattedEndDate,
        confirmationLink,
      }),
    });

    console.log(nodemailer.getTestMessageUrl(message));

    return { participant };
  }
}
