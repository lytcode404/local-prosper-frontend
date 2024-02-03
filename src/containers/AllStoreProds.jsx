import TopCard from "@/components/Cards/TopCard";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/api/fetchAllProducts";
import { useRouter } from "next/router";
const AllStoreProds = () => {
  const [brandsData, setBrandsData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllProducts();
        const brandId = router.query.brandId;
        const storeData = await fetchStoreData(brandId, data);
        // console.log(storeData);
        setBrandsData(storeData);
        // console.log("All brands and products:", data);
      } catch (error) {
        console.error("Error fetching brands and products:", error);
      }
    };

    fetchData();
  }, [router]);

  const fetchStoreData = async (brandId, data) => {
    try {
      const brand = await data?.find((brand) => brand.userId === brandId);

      if (brand) {
        console.log("Fetched brand data:", brand);
        return brand;
      } else {
        console.log("Brand not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching brand data:", error);
      return null;
    }
  };

  return (
    <>
      <div className="w-full -mt-4 bg-white p-4">
        <Title heading={`Our Top Products`} para={``} />
        <div className="grid grid-cols-6 max-sm:grid-cols-1 gap-4">
          {brandsData?.products?.map((product) => (
            <div key={product.id} className="border rounded-lg flex w-full">
              <TopCard
                productName={product.name}
                productPrice={product.price}
                productCurrency={product.currency}
                prodSlug={product.name + product.id}
                prodSrc={product.imageUrls[0]}
                productId={product.id}
                brand={brandsData.companyName}
                genre={brandsData.genre}
                brandId={brandsData.userId}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllStoreProds;
