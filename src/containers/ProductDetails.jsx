import { fetchAllProducts } from "@/api/fetchAllProducts";
import MultiCarosl from "@/components/Carousel.jsx/MultiCarosl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/db/firebase";
const ProductDetails = () => {
  const [productData, setProductData] = useState([]);
  const [count, setCount] = useState(1);
  const router = useRouter();
  const [isBought, setIsBought] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllProducts();
        const brandId = router.query.brandId;
        const productId = router.query.productId;
        // console.log(router);
        const pData = await fetchProduct(data, brandId, productId);
        setProductData(pData);
        console.log("All brands and products:", data);
        console.log(pData);
      } catch (error) {
        console.error("Error fetching brands and products:", error);
      }
    };

    fetchData();
  }, []);

  const handleBuyNow = () => {
    setIsBought(true);
  };
  console.log(auth.currentUser);
  const handleConfirmBuy = async () => {
    setIsBought(true);

    const businessRef = doc(db, "users", router.query.brandId);
    try {
      // Fetch the current data from Firestore
      const businessDoc = await getDoc(businessRef);

      // Extract the customers array from the document data
      const prev = businessDoc.exists()
        ? businessDoc.data().customers || []
        : [];

      const updatedCustomers = [
        ...prev,
        {
          productName: productData.name,
          productId: router.query.productId,
          noOfItems: count,
          customerName: auth.currentUser.displayName,
          customerId: auth.currentUser.uid,
          customerEmail: auth.currentUser.email,
        },
      ];

      await updateDoc(businessRef, { customers: updatedCustomers });
      setIsBought(false);
      toast.success("Product Bought!", { position: "bottom-right" });
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Not Bought!", { position: "bottom-right" });
    }
  };

  const handleCancelBuy = () => {
    setIsBought(false);
    toast.error("Not Bought!", { position: "bottom-right" });
  };

  const fetchProduct = async (data, brandId, productId) => {
    try {
      const brand = data.find(
        (brand) => brand.userId.trim() === brandId.trim()
      );

      if (brand) {
        // console.log("brand", brand.products[0].id.replace(/\+/g, " "));
        // console.log("query", productId);

        const product = brand.products.find(
          (product) =>
            product.id.replace(/\+/g, " ").trim() === productId.trim()
        );

        if (product) {
          // console.log("Fetched product data:", product.categoryFields);
          return product;
        } else {
          console.log("Product not found");
          return null;
        }
      } else {
        console.log("Brand not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching product data", error);
      return null;
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  function formatIndianNumber(number) {
    // Convert the number to a string with fixed two decimal places
    let formattedNumber = Number(number).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedNumber;
  }

  const handleWhatsappClick = () => {
    const shareUrl = encodeURIComponent(router.asPath);
    window.open(
      `https://wa.me/?text=https://phoenix-frontend-nine.vercel.app/${shareUrl}`,
      "_blank"
    );
  };

  const handleFacebookClick = () => {
    const shareUrl = encodeURIComponent(router.asPath);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://phoenix-frontend-nine.vercel.app/${shareUrl}`,
      "_blank"
    );
  };

  const handleTwitterClick = () => {
    const shareUrl = encodeURIComponent(router.asPath);
    window.open(
      `https://twitter.com/intent/tweet?url=https://phoenix-frontend-nine.vercel.app/${shareUrl}`,
      "_blank"
    );
  };

  const handleInstagramClick = () => {
    const shareUrl = encodeURIComponent(router.asPath);
    window.open(
      `https://www.instagram.com/?url=https://phoenix-frontend-nine.vercel.app/${shareUrl}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col gap-8 justify-start items-start">
      <div className="w-full grid grid-cols-[1fr,1fr] max-sm:grid-cols-1 gap-5">
        <div className="w-full">
          <MultiCarosl images={productData?.imageUrls} />
        </div>
        <div className="w-full flex flex-col ">
          <h2 className="text-3xl max-sm:text-2xl font-medium uppercase mb-2">
            {productData.name}
          </h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18c-5.3-11-16.5-18-28.8-18s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7l-143.7-21.2L316.9 18z" />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18c-5.3-11-16.5-18-28.8-18s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7l-143.7-21.2L316.9 18z" />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18c-5.3-11-16.5-18-28.8-18s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7l-143.7-21.2L316.9 18z" />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18c-5.3-11-16.5-18-28.8-18s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7l-143.7-21.2L316.9 18z" />
                </svg>
              </span>
            </div>
            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span
                className={`${
                  productData.availability ? "text-green-500" : "text-red-500"
                }`}
              >
                {productData.availability === true
                  ? "In Stock"
                  : "Out Of Stock"}
              </span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">{router?.query?.brand}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">
                {productData.category || router?.query?.genre}
              </span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              {productData?.currency}{" "}
              {formatIndianNumber(parseFloat(productData?.price).toFixed(2))}
            </p>
            {productData?.strikePrice && productData?.strikePrice !== "0" && (
              <p className="text-base text-gray-400 line-through">
                {productData?.currency}{" "}
                {formatIndianNumber(
                  parseFloat(productData.strikePrice).toFixed(2)
                )}
              </p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <button
                onClick={handleDecrement}
                className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
              >
                -
              </button>
              <div className="h-8 w-8 text-base flex items-center justify-center">
                {count}
              </div>
              <button
                onClick={handleIncrement}
                className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <button
              onClick={handleBuyNow}
              className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-red-300 hover:text-white transition bg-red-500 cursor-pointer"
            >
              Buy Now
            </button>
            {isBought && (
              <div className="fixed bg-white bg-opacity-90 rounded-md text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-6 flex flex-col gap-2 w-[500px] max-md:w-[340px] uppercase">
                <p className="text-lg md:text-2xl font-semibold ">
                  {productData.name}
                </p>
                <p className="space-x-2 md:text-lg w-full flex justify-between">
                  <span className="text-gray-800 font-semibold ">Brand: </span>
                  <span className="text-gray-600">{router?.query?.brand}</span>
                </p>
                <p className="space-x-2 md:text-lg flex justify-between">
                  <span className="text-gray-800 font-semibold">
                    Category:{" "}
                  </span>
                  <span className="text-gray-600">
                    {productData.category || router?.query?.genre}
                  </span>
                </p>
                <div className="flex justify-between space-x-2 font-roboto">
                  <span className="text-gray-800 font-semibold">Total:</span>
                  <p className="text-xl text-primary font-semibold">
                    {productData?.currency}{" "}
                    {formatIndianNumber(
                      (parseFloat(productData?.price) * count).toFixed(2)
                    )}
                  </p>
                  {productData?.strikePrice &&
                    productData?.strikePrice !== "0" && (
                      <p className="text-base text-gray-400 line-through">
                        {productData?.currency}{" "}
                        {formatIndianNumber(
                          (parseFloat(productData.strikePrice) * count).toFixed(
                            2
                          )
                        )}
                      </p>
                    )}
                </div>
                <p className=" text-gray-600 break-all normal-case">
                  {productData?.shortDescription}
                </p>
                {/* quantity */}
                <div className="w-full  flex flex-col justify-center items-start md:text-xl">
                  <h3 className="text-sm text-gray-800 uppercase mb-1 md:text-xl">
                    Quantity
                  </h3>
                  <div className="flex border border-gray-300 text-gray-600 divide-gray-300 w-full">
                    <button
                      onClick={handleDecrement}
                      className="h-8 w-full text-xl flex items-center justify-center cursor-pointer select-none border"
                    >
                      -
                    </button>
                    <div className="h-8 w-full text-base flex items-center justify-center border">
                      {count}
                    </div>
                    <button
                      onClick={handleIncrement}
                      className="h-8 w-full text-xl flex items-center justify-center cursor-pointer select-none border"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 w-full">
                  <button
                    onClick={handleCancelBuy}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300 transition w-full"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirmBuy}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300 transition w-full"
                  >
                    Yes
                  </button>
                </div>
              </div>
            )}
            {isBought && (
              <div
                onClick={() => setIsBought(false)}
                className="fixed top-0 left-0 w-[100vw] h-[100vh] inset-0 bg-gray-700 bg-opacity-80 z-40"
              ></div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
              onClick={handleWhatsappClick}
            >
              <Image src={`/whatsapp.png`} alt="" height={65} width={65} />
            </button>
            <button
              onClick={handleFacebookClick}
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Image src={`/facebook.png`} alt="" height={65} width={65} />
            </button>
            <button
              onClick={handleTwitterClick}
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Image src={`/twitter.png`} alt="" height={65} width={65} />
            </button>
            <button
              onClick={handleInstagramClick}
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Image src={`/instagram.png`} alt="" height={65} width={65} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden">
        <p className=" text-gray-600 break-all">
          {productData?.shortDescription}
        </p>
        <div className="container pb-16">
          <div className="w-full pt-6">
            <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
              Product details
            </h3>
            <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
              <tbody>
                {productData?.categoryFields &&
                  Object.keys(productData.categoryFields).map((key, index) => (
                    <tr key={index}>
                      <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                        {key}
                      </th>
                      <td className="py-2 px-4 border border-gray-300">
                        {productData.categoryFields[key]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="text-gray-600 max-sm:text-sm mt-3 w-full overflow-x-hidden break-all">
              {productData?.description &&
              productData.description.includes("\n") ? (
                productData.description.split("\n").map((line, index) => (
                  <p key={index} className="mb-2 whitespace-normal w-full">
                    {line}
                  </p>
                ))
              ) : (
                <p className="mb-2 whitespace-normal w-full">
                  {productData?.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
