import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ slug }) => {
  return (
    <Link href={`/${slug}`} className="p-4  w-1/6">
      <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <Image
          height={1222}
          width={1222}
          alt="gallery"
          className="w-full object-cover h-full object-center block"
          src="https://dummyimage.com/500x300"
        />
        <h2 className="title-font font-medium text-3xl text-gray-900">2.7K</h2>
        <p className="leading-relaxed">Downloads</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
