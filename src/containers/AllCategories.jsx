import { fetchAllProducts } from "@/api/fetchAllProducts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CategoryCard from "@/components/Cards/CategoryCard";
import TopCard from "@/components/Cards/TopCard";
import Title from "@/components/Title";
import React, { useEffect, useState } from "react";
import { MultiResponsive } from "@/utils/MultiCaroslResponsive";

const AllCategories = () => {
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
    <section className="text-gray-900 body-font w-full mb-10">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 max-sm:hidden">
          {brandsData.map((brand) => (
            <div
              key={brand.userId}
              className="border p-4 rounded-lg w-full bg-white"
            >
              <Title heading={brand.companyName} para={``} />
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
                {brand.products.map((product) => (
                  <div key={product.id} className="mb-2 border p-4 rounded-lg">
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
                ))}
              </Carousel>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {brandsData.map((brand) => (
            <div
              key={brand.userId}
              className="border p-4 rounded w-full bg-white"
            >
              <Title heading={brand.companyName} para={``} />
              <div className="overflow-x-auto w-full">
                <div className="flex gap-4">
                  {brand.products.map((product) => (
                    <div
                      key={product.id}
                      className="mb-2 border p-4 rounded-lg"
                    >
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
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCategories;
