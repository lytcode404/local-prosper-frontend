import ProductCard from "@/components/Cards/ProductCard";
import Title from "@/components/Title";
import React from "react";

const AllProds = () => {
  return (
    <section className="text-gray-600 body-font">
      <Title heading={`Our Proudcts`} para={``} />
      <div className="w-full">
        <div className="grid grid-cols-2 gap-2 justify-between items-center">
          <ProductCard slug={`dlsdfk`} />
          <ProductCard slug={`dlrtfk`} />
          <ProductCard slug={`dlfk`} />
          <ProductCard slug={`dlufk`} />
          <ProductCard slug={`dlfk`} />
          <ProductCard slug={`dlfetyk`} />
          <ProductCard slug={`dlyufk`} />
          <ProductCard slug={`dlfk`} />
          <ProductCard slug={`dlfk`} />
          <ProductCard slug={`dlfukk`} />
          <ProductCard slug={`dlrtyfk`} />
          <ProductCard slug={`dlfk`} />
          <ProductCard slug={`dlfkg`} />
          <ProductCard slug={`dlfk`} />
          <ProductCard slug={`dlrhfk`} />
          <ProductCard slug={`dlfk`} />
          <ProductCard slug={`dlferk`} />
          <ProductCard slug={`dlfsdfk`} />
          <ProductCard slug={`dlffk`} />
        </div>
      </div>
    </section>
  );
};

export default AllProds;
