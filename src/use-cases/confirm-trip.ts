import nodemailer from "nodemailer";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import dayjs from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { TripsRepository } from "../repositories/trips-repository";
import { getInviteEmailBody } from "../utils/html-email-bodies/invite-email";

interface ConfirmTripUseCaseRequest {
  tripId: string;
}

interface ConfirmTripUseCaseResponse {
  tripURL: string;
}

export class ConfirmTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    tripId,
  }: ConfirmTripUseCaseRequest): Promise<ConfirmTripUseCaseResponse> {
    const trip = await this.tripsRepository.findByIdWithInvitedParticipants(
      tripId
    );

    if (!trip) {
      throw new ResourceNotFoundError();
    }

    if (trip.is_confirmed) {
      return { tripURL: `http://localhost:3000/trips/${tripId}` };
    }

    await this.tripsRepository.confirm(tripId);

    const destination = trip.destination;

    const formattedStartDate = dayjs(trip.starts_at).format("LL");
    const formattedEndDate = dayjs(trip.ends_at).format("LL");

    const mail = await getMailClient();

    await Promise.all(
      trip.participants.map(async (participant) => {
        const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`;

        const message = await mail.sendMail({
          from: {
            name: "TripTact Trips",
            address: "trips@triptact.com",
          },
          to: participant.email,
          subject: `Confirm your travel to ${destination} on ${formattedStartDate}`,
          html: getInviteEmailBody({
            destination,
            formattedStartDate,
            formattedEndDate,
            confirmationLink,
          }),
        });

        console.log(nodemailer.getTestMessageUrl(message));
      })
    );

    return { tripURL: `http://localhost:3000/trips/${tripId}` };
  }
}
