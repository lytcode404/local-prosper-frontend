import Image from "next/image";
import Link from "next/link";
import React from "react";

const StoreCard = ({ brandName, brandLogo, id, slug }) => {
  return (
    <Link
      href={`stores/${slug}?brandId=${id}&brandName=${brandName}`}
      className="mx-4"
    >
      <div className="w-full max-sm:w-[200px]">
        <div className="border-2 border-gray-200 p-4 rounded-lg overflow-hidden bg-blue-50">
          <div className="mb-4">
            <Image
              height={300}
              width={300}
              alt="Brand Logo"
              className="w-full object-cover h-full object-center block rounded"
              src={brandLogo ? brandLogo : "/user.png"}
            />
          </div>
          <p className="text-lg font-semibold leading-tight mb-2 capitalize  h-[2em]">
            {brandName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
