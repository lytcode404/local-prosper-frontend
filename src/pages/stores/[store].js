import BannerCarosl from "@/components/Carousel.jsx/BannerCarosl";
import AllStoreProds from "@/containers/AllStoreProds";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
const store = () => {
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");
  const [isGenerateClicked, setIsGenerateClicked] = useState(false);

  const router = useRouter();

  const generateQRCode = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}${router.asPath}`;
      const response = await axios.post("/api/generateQR", { url });
      setQRCodeDataURL(response.data.qrCodeDataURL);
      setIsGenerateClicked(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleDownloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeDataURL;
    link.download = "qrcode.png";
    link.click();
    setIsGenerateClicked(false);
  };

  return (
    <div className="flex flex-col flex-wrap gap-4 w-full">
      <BannerCarosl />
      <div className="w-full flex flex-col bg-gray-50 justify-end items-end my-4 p-4">
        <button
          className="bg-blue-400 rounded px-4 py-2 text-white w-fit"
          onClick={generateQRCode}
        >
          Generate QR Code
        </button>

        {qrCodeDataURL && isGenerateClicked && (
          <>
            <div
              onClick={() => setIsGenerateClicked(false)}
              className="fixed top-0 left-0  w-[100vw] h-[100vh] bg-gray-500 flex flex-col items-center justify-center z-50 opacity-25"
            ></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-gray-50 flex flex-col items-center justify-center z-50">
              <Image
                width={200}
                height={200}
                className=""
                src={qrCodeDataURL}
                alt="QR Code"
              />
              <button
                className="bg-green-400 rounded px-4 py-2 text-white w-fit"
                onClick={handleDownloadQRCode}
              >
                Download QR Code
              </button>
            </div>
          </>
        )}
      </div>
      <AllStoreProds />
    </div>
  );
};

export default store;
