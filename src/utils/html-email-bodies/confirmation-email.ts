interface ConfirmationEmailData {
  destination: string;
  formattedStartDate: string;
  formattedEndDate: string;
  confirmationLink: string;
}

export function getConfirmationEmailBody(data: ConfirmationEmailData): string {
  return `
  <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
    <p>
      You have requested to create a trip to
      <strong>${data.destination}</strong> for the dates
      <strong>${data.formattedStartDate}</strong> to 
      <strong> ${data.formattedEndDate}</strong>.
    </p>
    <p></p>
    <p>To confirm your trip, click on the link below:</p>
    <p></p>
    <p><a href="${data.confirmationLink}">Confirm Trip</a></p>
    <p></p>
    <p>
      If you do not know what this email is about, just ignore this email.
    </p>
  </div>
  `.trim();
}
