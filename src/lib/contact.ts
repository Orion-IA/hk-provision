import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const INTERESTS = [
  "Hotel Supply",
  "Hospitality Consultancy",
  "Events Management",
  "Asset Management",
  "Other",
] as const;

// Strip line breaks from single-line fields so they can't inject mail headers.
const line = (max: number) => z.string().trim().max(max).transform((s) => s.replace(/[\r\n]+/g, " "));

const contactSchema = z.object({
  name: line(120).pipe(z.string().min(1)),
  company: line(160).default(""),
  email: line(200).pipe(z.string().email()),
  phone: line(40).default(""),
  interest: z.enum(INTERESTS),
  message: z.string().trim().min(1).max(4000),
  website: z.string().optional(), // honeypot, must stay empty
});

export type ContactInput = z.input<typeof contactSchema>;

export const sendContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot filled: pretend it worked, send nothing.
    if (data.website) return { ok: true };
    const { sendContactEmail } = await import("@/server/mailer");
    try {
      await sendContactEmail(data);
      return { ok: true };
    } catch (err) {
      console.error("[contact] send failed:", err);
      throw new Error("Message could not be sent right now.");
    }
  });
