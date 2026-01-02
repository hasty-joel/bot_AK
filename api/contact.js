import { connectDB } from "../lib/mongodb";
import Message from "../models/Message";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // 1️⃣ Save message
    await connectDB();
    await Message.create({ name, email, message });

    // 2️⃣ Send WhatsApp notification
    const text =
      `📩 *New Contact Message*\n\n` +
      `👤 Name: ${name}\n` +
      `📧 Email: ${email}\n\n` +
      `📝 Message:\n${message}`;

    await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: process.env.WHATSAPP_TO,
          type: "text",
          text: { body: text },
        }),
      }
    );

    return res.status(200).json({
      message: "Message sent and saved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
