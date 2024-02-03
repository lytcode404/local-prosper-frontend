import { fetchAllBrands } from "@/api/fetchAllBrands";
import BannerCarosl from "@/components/Carousel.jsx/BannerCarosl";
import TopProdCarosl from "@/components/Carousel.jsx/TopProdCarosl";
import ProductGallery from "@/components/ProductGallery";
import AllCategories from "@/containers/AllCategories";
import AllProds from "@/containers/AllProds";
import AllStores from "@/containers/AllStores";
import React, { useEffect } from "react";
// ok
const Home = () => {
  return (
    <div className="flex flex-col flex-wrap gap-4 w-full">
      <BannerCarosl />
      <TopProdCarosl />
      <AllStores />
      {/* <ProductGallery /> */}
      <AllCategories />
      {/* <AllProds /> */}
    </div>
  );
};

export default Home;
