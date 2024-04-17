import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { ConfirmEmail } from "@/emails/confirm-email";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log({ email });

    const data = await resend.emails.send({
      from: `${process.env.SITE_TITLE as string} <${
        process.env.SITE_EMAIL as string
      }>`,
      to: email,
      subject: "Confirm your email",
      react: ConfirmEmail(),
    });

    console.log(data);

    return NextResponse.json({
      status: "200",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
