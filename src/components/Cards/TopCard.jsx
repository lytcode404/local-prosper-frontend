import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCard = ({
  productName,
  productPrice,
  productCurrency,
  prodSrc,
  prodSlug,
  brand,
  genre,
  productId,
  brandId,
}) => {
  function formatIndianNumber(number) {
    // Convert the number to a string with fixed two decimal places
    let formattedNumber = Number(number).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedNumber;
  }

  return (
    <Link
      href={`/products/${prodSlug}?brand=${brand}&genre=${genre}&productId=${productId}&brandId=${brandId}&brandName=${brand}`}
      className="w-full my-4"
    >
      <div className="block relative h-40 max-sm:w-56 rounded overflow-hidden mx-auto">
        <Image
          height={1222}
          width={1222}
          alt="ecommerce"
          className="object-contain object-center w-full h-full block"
          src={prodSrc ? prodSrc : `/assets/ayurveda.png`}
        />
      </div>
      <div className="mt-4 w-full flex flex-col justify-center items-center">
        <p className="text-gray-800 text-sm title-font mb-1">{productName}</p>
        <h3 className="mt-1 text-black font-semibold text-lg">
          {formatIndianNumber(productPrice)} {productCurrency}
        </h3>
      </div>
    </Link>
  );
};

export default TopCard;
