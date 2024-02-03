import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import "../../../public/assets"
// const images = [
//   "https://dummyimage.com/480x260",
//   "https://dummyimage.com/620x260",
//   "https://dummyimage.com/520x260",
//   "https://dummyimage.com/320x260",
//   "https://dummyimage.com/360x260",
//   "https://dummyimage.com/360x250",
//   "https://dummyimage.com/360x250",
//   "https://dummyimage.com/360x250",
//   "https://dummyimage.com/360x250",
// ];

const MultiCarosl = ({ images }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <style>
          {`
          .carousel-root {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items:center;
            width: 100%;
           }

           .carousel-root .slide{
            width: 100%;
            padding: 0px 0px;
           }

          .carousel-root .slide img {
              width: 100%;
              height:fit;
              cursor: pointer !important;
            }
            .carousel-root .thumb img {
              width: 5rem !important;
              height: 5rem !important;
            }


            .carousel-root .slide li {
              height: fit !important;
              max-width: fit !important;
              cursor: pointer !important;
            }

           


`}
        </style>
      </Head>

      <div className="w-full  px-0 py-4  flex justify-start items-start">
        <Carousel
          showArrows={true}
          autoPlay={true}
          showIndicators={false}
          swipeable={true}
          infiniteLoop={true}
          className="carousel-container"
          showThumbs={true}
          renderThumbs={() =>
            images?.map((thumbnail, index) => (
              <Image
                className="h-full w-full"
                width={100}
                height={100}
                src={thumbnail}
                alt={thumbnail}
                key={index}
              />
            ))
          }
        >
          {images ? (
            images.map((image, index) => {
              return (
                <div
                  key={index}
                  className="carosl-item h-full max-h-[70vh] bg-white"
                >
                  <Image
                    alt=""
                    src={image}
                    width={1944}
                    height={944}
                    className="object-contain sm:h-full"
                  />
                </div>
              );
            })
          ) : (
            <Image />
          )}
        </Carousel>
      </div>
    </>
  );
};

export default MultiCarosl;
