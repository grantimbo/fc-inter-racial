"use server";

import nodemailer from "nodemailer";
import { generateEmailTemplate } from "./email-template";

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const captchaToken = formData.get("g-recaptcha-response") as string;

  // Validate fields
  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required." };
  }

  if (!captchaToken) {
    return { success: false, message: "Please complete the CAPTCHA." };
  }

  try {
    // Verify CAPTCHA
    const verificationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: "POST" }
    );
    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      return { success: false, message: "CAPTCHA verification failed. Please try again." };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER, // Sender address
      to: process.env.SMTP_TO || process.env.SMTP_USER, // List of receivers (sending to self)
      replyTo: email, // Reply to the user
      subject: `Contact Form: ${subject}`, // Subject line
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: generateEmailTemplate(name, email, subject, message),
    });

    return { success: true, message: "Message sent successfully! We'll get back to you soon." };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}
