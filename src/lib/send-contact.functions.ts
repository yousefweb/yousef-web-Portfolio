import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  // honeypot
  website: z.string().max(0).optional(),
});

// simple in-memory rate limiter per IP (best-effort)
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count++;
  return true;
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { getRequestHeader } = await import("@tanstack/react-start/server");
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (!rateLimit(ip)) {
      throw new Error("Too many requests. Please wait a minute and try again.");
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!serviceId || !templateId || !publicKey || !toEmail) {
      throw new Error("Email service is not configured.");
    }

    const templateParams = {
      to_name: "Yousef",
      to_email: toEmail,
      recipient_email: toEmail,
      email_to: toEmail,
      from_name: data.name,
      name: data.name,
      from_email: data.email,
      email: data.email,
      user_email: data.email,
      subject: data.subject,
      title: data.subject,
      message: data.message,
      reply_to: data.email,
    };

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Identify as a server-origin call
        origin: "https://portfolio.server",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("EmailJS send failed", res.status, text);
      throw new Error("Failed to send message. Please try again later.");
    }

    return { ok: true as const };
  });
