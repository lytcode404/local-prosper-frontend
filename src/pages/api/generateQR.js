// pages/api/generateQR.js

import QRCode from "qrcode";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req, res) => {
  try {
    const { url } = req.body; // Assuming you'll send the URL via POST request body
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(url);

    // Send the data URL of the QR code as response
    res.status(200).json({ qrCodeDataURL });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};
