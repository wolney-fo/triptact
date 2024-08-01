interface InviteEmailData {
  destination: string;
  formattedStartDate: string;
  formattedEndDate: string;
  confirmationLink: string;
}

export function getInviteEmailBody(data: InviteEmailData): string {
  return `
  <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
    <p>
      You have been invited to participate in a trip to <strong>${data.destination}</strong> on the
      dates of <strong>${data.formattedStartDate}</strong> to <strong>${data.formattedEndDate}</strong>.
    </p>
    <p></p>
    <p>To confirm your attendance on the trip, click on the link below:</p>
    <p></p>
    <a href=${data.confirmationLink}>Confirm attendance</a>
    <p></p>
    <p>
      If you do not know what this email is about or cannot attend, just ignore it.
    </p>
  </div>
  `.trim();
}
