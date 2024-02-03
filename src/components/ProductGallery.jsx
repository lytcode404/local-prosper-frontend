import React from "react";
import Title from "./Title";
import Image from "next/image";
import Link from "next/link";

const ProductGallery = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <Title heading={`Our Trending Products`} para={``} />
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <Link href={`/${"slug"}`} className="md:p-2 p-1 w-1/2">
              <Image
                height={1222}
                width={1222}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/500x300"
              />
            </Link>
            <Link href={`/${"slug2"}`} className="md:p-2 p-1 w-1/2">
              <Image
                height={1222}
                width={1222}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/501x301"
              />
            </Link>
            <Link href={`/${"slug3"}`} className="md:p-2 p-1 w-full">
              <Image
                height={1222}
                width={1222}
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://dummyimage.com/600x360"
              />
            </Link>
          </div>
          <div className="flex flex-wrap w-1/2">
            <Link href={`/${"slug4"}`} className="md:p-2 p-1 w-full">
              <Image
                height={1222}
                width={1222}
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://dummyimage.com/601x361"
              />
            </Link>
            <Link href={`/${"slug5"}`} className="md:p-2 p-1 w-1/2">
              <Image
                height={1222}
                width={1222}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/502x302"
              />
            </Link>
            <Link href={`/${"slug6"}`} className="md:p-2 p-1 w-1/2">
              <Image
                height={1222}
                width={1222}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/503x303"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
