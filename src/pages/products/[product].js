import CommentSection from "@/containers/CommentSection";
import ProductDetails from "@/containers/ProductDetails";
import RelatedProds from "@/containers/RelatedProds";
import React from "react";

const Product = () => {
  return (
    <div className="-mt-10 mb-10">
      <ProductDetails />
      <RelatedProds />
      {/* <CommentSection /> */}
    </div>
  );
};

export default Product;
