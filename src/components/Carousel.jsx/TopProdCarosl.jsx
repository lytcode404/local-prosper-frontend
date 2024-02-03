import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../Cards/ProductCard";
import TopCard from "../Cards/TopCard";
import Title from "../Title";
import { fetchAllProducts } from "@/api/fetchAllProducts";
import { MultiResponsive } from "@/utils/MultiCaroslResponsive";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TopProdCarosl = () => {
  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllProducts();
        setBrandsData(data);
        // console.log("All brands and products:", data);
      } catch (error) {
        console.error("Error fetching brands and products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full -mt-4 bg-white p-4 max-sm:hidden">
        <Title heading={`Our Top Products`} para={``} />
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={MultiResponsive}
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
          {brandsData?.map((brand) =>
            brand.products?.map((product) => (
              <div key={product.id} className="border rounded-lg flex w-full">
                <TopCard
                  productName={product.name}
                  productPrice={product.price}
                  productCurrency={product.currency}
                  prodSlug={product.name + product.id}
                  prodSrc={product.imageUrls[0]}
                  productId={product.id}
                  brand={brand.companyName}
                  genre={brand.genre}
                  brandId={brand.userId}
                />
              </div>
            ))
          )}
        </Carousel>
      </div>

      <div className="w-full -mt-4 bg-white p-4 sm:hidden  relative">
        <Title heading={`Our Top Products`} para={``} />
        <div className="overflow-x-auto w-full">
          <div className="flex gap-4">
            {brandsData?.map((brand, i) =>
              brand.products?.map((product) => (
                <div key={product.id} className={`border rounded p-4 w-full`}>
                  <TopCard
                    productName={product.name}
                    productPrice={product.price}
                    productCurrency={product.currency}
                    prodSlug={product.name + product.id}
                    prodSrc={product.imageUrls[0]}
                    productId={product.id}
                    brand={brand.companyName}
                    genre={brand.genre}
                    brandId={brand.userId}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopProdCarosl;
