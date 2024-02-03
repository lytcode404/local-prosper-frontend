import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ slug }) => {
  return (
    <Link href={`/${slug}`} className="w-full my-4">
      <div className="block relative h-48 rounded overflow-hidden">
        <Image
          height={1222}
          width={1222}
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src="https://dummyimage.com/420x260"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          CATEGORY
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          The Catalyzer
        </h2>
        <p className="mt-1">$16.00</p>
      </div>
    </Link>
  );
};

export default ProductCard;
