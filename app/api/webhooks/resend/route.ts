import { NextResponse } from "next/server";
import { Resend } from "resend";

import { saveReport } from "@/lib/reports";

export const runtime = "nodejs";

const ADDRESS = "help@aiagenthelpline.com";
const MAX_TITLE_LENGTH = 140;
const MAX_BODY_LENGTH = 20_000;

type EmailReceivedEvent = {
  type: "email.received";
  created_at: string;
  data: {
    email_id: string;
    to: string[];
    subject?: string;
  };
};

function plainTextFromHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  if (!apiKey || !webhookSecret || !process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Service is not configured" }, { status: 503 });
  }

  const payload = await request.text();
  const resend = new Resend(apiKey);

  let event: EmailReceivedEvent;

  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get("svix-id") ?? "",
        timestamp: request.headers.get("svix-timestamp") ?? "",
        signature: request.headers.get("svix-signature") ?? "",
      },
      webhookSecret,
    }) as EmailReceivedEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ received: true });
  }

  const isForHelpline = event.data.to.some(
    (recipient) => recipient.toLowerCase() === ADDRESS,
  );

  if (!isForHelpline) {
    return NextResponse.json({ received: true, published: false });
  }

  let email:
    | Awaited<ReturnType<typeof resend.emails.receiving.get>>["data"]
    | undefined;
  let retrievalError:
    | Awaited<ReturnType<typeof resend.emails.receiving.get>>["error"]
    | undefined;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const result = await resend.emails.receiving.get(event.data.email_id);
    email = result.data;
    retrievalError = result.error;

    if (email) break;
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 500));
  }

  if (retrievalError || !email) {
    console.error("Could not retrieve received email", {
      name: retrievalError?.name,
      message: retrievalError?.message,
      statusCode: retrievalError?.statusCode,
    });
    return NextResponse.json(
      { error: "Could not retrieve email" },
      { status: 502 },
    );
  }

  const title = (email.subject?.trim() || "Untitled report").slice(
    0,
    MAX_TITLE_LENGTH,
  );
  const body = (email.text?.trim() || plainTextFromHtml(email.html || "")).slice(
    0,
    MAX_BODY_LENGTH,
  );

  if (!body) {
    return NextResponse.json(
      { error: "The email did not contain a report" },
      { status: 422 },
    );
  }

  await saveReport({
    id: event.data.email_id,
    title,
    body,
    publishedAt: email.created_at || event.created_at,
    public: false,
  });

  return NextResponse.json({ received: true, stored: true, published: false });
}
