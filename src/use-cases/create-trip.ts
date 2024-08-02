import { Trip } from "@prisma/client";
import nodemailer from "nodemailer";
import { InvalidEndDateError } from "../errors/invalid-end-date-error";
import { InvalidStartDateError } from "../errors/invalid-start-date-error";
import dayjs from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { TripsRepository } from "../repositories/trips-repository";
import { getConfirmationEmailBody } from "../utils/html-email-bodies/confirmation-email";

interface CreateTripUseCaseRequest {
  destination: string;
  starts_at: Date;
  ends_at: Date;
  owner_name: string;
  owner_email: string;
  emails_to_invite: string[];
}

interface CreateTripUseCaseResponse {
  trip: Trip;
}

export class CreateTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    destination,
    starts_at,
    ends_at,
    owner_name,
    owner_email,
    emails_to_invite,
  }: CreateTripUseCaseRequest): Promise<CreateTripUseCaseResponse> {
    if (dayjs(starts_at).isBefore(new Date())) {
      throw new InvalidStartDateError();
    }

    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new InvalidEndDateError();
    }

    const trip = await this.tripsRepository.create({
      destination,
      starts_at,
      ends_at,
      participants: {
        createMany: {
          data: [
            {
              name: owner_name,
              email: owner_email,
              is_owner: true,
              is_confirmed: true,
            },
            ...emails_to_invite.map((email) => {
              return {
                email,
              };
            }),
          ],
        },
      },
    });

    const formattedStartDate = dayjs(starts_at).format("LL");
    const formattedEndDate = dayjs(ends_at).format("LL");

    const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`;

    const mail = await getMailClient();

    const message = await mail.sendMail({
      from: {
        name: "TripTact Trips",
        address: "trips@triptact.com",
      },
      to: {
        name: owner_name,
        address: owner_email,
      },
      subject: `Confirm your travel to ${destination} on ${formattedStartDate}`,
      html: getConfirmationEmailBody({
        destination,
        formattedStartDate,
        formattedEndDate,
        confirmationLink,
      }),
    });

    console.log(nodemailer.getTestMessageUrl(message));

    return { trip };
  }
}
