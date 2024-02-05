import { useState } from "react";
import axios from "axios";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");

  const generateQRCode = async () => {
    try {
      const response = await axios.post("/api/generateQR", { url });
      setQRCodeDataURL(response.data.qrCodeDataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" />}
    </div>
  );
}
