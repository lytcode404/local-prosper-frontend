import { fetchAllBrands } from "@/api/fetchAllBrands";
import StoreCard from "@/components/Cards/StoreCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Title from "@/components/Title";
import React, { useEffect, useState } from "react";
import {
  MultiResponsive,
  MultiResponsive2,
} from "@/utils/MultiCaroslResponsive";

const AllStores = () => {
  const [allBrands, setAllBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await fetchAllBrands();
        setAllBrands(documents);
        // console.log("User documents:", documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className=" mt-10 bg-white p-4 max-sm:hidden">
        <Title heading={`Our Listed Stores`} para={``} />
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={MultiResponsive2}
          ssr={true}
          infinite={true}
          sliderClass=""
          slidesToSlide={1}
          // autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item"
        >
          {allBrands &&
            allBrands.map((brand) => {
              return (
                <StoreCard
                  key={brand.id}
                  brandName={brand.companyName}
                  brandLogo={brand?.assets?.logoImg}
                  id={brand.id}
                  slug={brand.companyName + brand.id}
                />
              );
            })}
        </Carousel>
      </div>
      <div className="mt-5 bg-white p-4 sm:hidden w-full">
        <Title heading={`Our Listed Stores`} para={``} />
        <div className=" overflow-x-auto">
          <div className="flex gap-4">
            {allBrands &&
              allBrands.map((brand) => {
                return (
                  <StoreCard
                    key={brand.id}
                    brandName={brand.companyName}
                    brandLogo={brand?.assets?.logoImg}
                    id={brand.id}
                    slug={brand.companyName + brand.id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllStores;
