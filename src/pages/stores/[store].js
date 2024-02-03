import BannerCarosl from "@/components/Carousel.jsx/BannerCarosl";
import AllStoreProds from "@/containers/AllStoreProds";
import React from "react";

const store = () => {
  return (
    <div className="flex flex-col flex-wrap gap-4 w-full">
      <BannerCarosl />
      <AllStoreProds />
    </div>
  );
};

export default store;
