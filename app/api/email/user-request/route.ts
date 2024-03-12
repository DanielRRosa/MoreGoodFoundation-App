import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import { UserLoginRequest } from "@/email/user-login-request";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  try {
    const data = await resend.emails.send({
      from: `${process.env.SITE_TITLE as string} <${
        process.env.SITE_EMAIL as string
      }>`,
      to: email,
      subject: "User request",
      react: UserLoginRequest(),
    });

    return NextResponse.json({
      status: "200",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
