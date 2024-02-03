import { fetchAllProducts } from "@/api/fetchAllProducts";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllProducts();
        setBrandsData(data);
        console.log("All brands and products:", data);
      } catch (error) {
        console.error("Error fetching brands and products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-8">
      <h3 className="text-md font-semibold mb-2">All Combined Products</h3>
      <div className="grid grid-cols-3 gap-4">
        {brandsData.map((brand) =>
          brand.products.map((product) => (
            <div
              key={product.id}
              className=" border p-4 rounded-lg flex w-full"
            >
              {product.name} - {product.price} {product.currency}
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Render all brands */}
        {brandsData.map((brand) => (
          <div key={brand.userId} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{brand.companyName}</h2>
            {/* Render all combined products */}
            <div className="mb-4 grid grid-cols-3 gap-4">
              {brand.products.map((product) => (
                <div key={product.id} className="mb-2 border p-4 rounded-lg">
                  {product.name} - {product.price} {product.currency}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
