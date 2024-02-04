import { auth, db } from "@/db/firebase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { fetchAllProducts } from "@/api/fetchAllProducts";

const placeholders = ["brand", "product name", "genre", "category"];

const Header = ({ User }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedContents, setMatchedContents] = useState({});
  const [isMatchedModelOpen, setIsMatchedModelOpen] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [placeholderTxt, setPlaceholderTxt] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const router = useRouter();
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderTxt((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const usersCollection = collection(db, "frontendUsers");
      const userDoc = await getDoc(doc(usersCollection, user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(usersCollection, user.uid), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(), // Use serverTimestamp() directly
        });
      }

      console.log("Login successful!", user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setIsMatchedModelOpen(true);

    const matchedBrands = brandsData.filter((brand) =>
      brand.companyName.toLowerCase().includes(term.toLowerCase())
    );
    const matchedModels = brandsData.filter((brand) =>
      brand.products.some((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      )
    );
    const matchedGenres = brandsData.filter((brand) =>
      brand.genre.toLowerCase().includes(term.toLowerCase())
    );
    const matchedCategories = brandsData.filter((brand) =>
      brand.products.some(
        (product) =>
          product.category?.toLowerCase().includes(term.toLowerCase()) ||
          brand.genre.toLowerCase().includes(term.toLowerCase())
      )
    );

    setMatchedContents((prev) => ({
      ...prev,
      matchedBrands,
      matchedModels,
      matchedGenres,
      matchedCategories,
    }));
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const toggleSideMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotificationsMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isNotificationsMenuOpen);
  };

  return (
    <header className="bg-navigation fixed z-30 w-full py-4 shadow-md">
      <div className="flex items-center justify-between h-full px-6 mx-auto">
        <Link href={`/`} className="text-xl font-bold text-heading">
          LocalProsper
          {router?.query?.brandName && (
            <p className="text-sm"> {" + " + router?.query?.brandName}</p>
          )}
        </Link>
        <div
          className={` w-full  mx-auto ${
            isSearchVisible
              ? "fixed left-0 top-2 right-0 w-[90%] z-40"
              : "max-sm:hidden relative max-w-md"
          }`}
        >
          <input
            type="text"
            className="w-full h-10 px-4 pr-10 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={`search with ${placeholders[placeholderTxt]} ...`}
          />
          <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              className="w-5 h-5 -mb-1"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {isMatchedModelOpen && (
            <div
              onClick={() => {
                setIsMatchedModelOpen(false);
                setIsSearchVisible(false);
              }}
              className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-transparent"
            ></div>
          )}
          {isMatchedModelOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
              <ul className=" flex flex-col gap-2 h-[70vh] overflow-y-auto">
                {/* Display matched brands */}
                {matchedContents?.matchedBrands?.map((brand, index) => (
                  <Link
                    key={index}
                    className="border-b"
                    href={`/stores/${
                      brand.companyName + brand.userId
                    }?brandId=${brand.userId}&brandName=${brand.companyName}`}
                    onClick={() => setIsMatchedModelOpen(false)}
                  >
                    <div className="px-4 py-3 pt-5 hover:bg-gray-100 cursor-pointer">
                      {brand.companyName}
                    </div>
                  </Link>
                ))}

                {/* Display matched models */}
                {matchedContents?.matchedModels?.map((brand) =>
                  brand.products.map((product, index) => (
                    <Link
                      key={index}
                      className="border-b"
                      href={`/products/${product.name + product.id}?brand=${
                        brand.companyName
                      }&genre=${brand.genre}&productId=${product.id}&brandId=${
                        brand.userId
                      }&brandName=${brand.companyName}`}
                      onClick={() => setIsMatchedModelOpen(false)}
                    >
                      <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                        {product.name}
                      </div>
                    </Link>
                  ))
                )}

                {/* Display matched genres */}
                {matchedContents?.matchedGenres?.map((brand, index) => (
                  <Link
                    key={index}
                    href={`/stores/${
                      brand.companyName + brand.userId
                    }?brandId=${brand.userId}&brandName=${brand.companyName}`}
                    onClick={() => setIsMatchedModelOpen(false)}
                  >
                    <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                      {brand.genre}
                    </div>
                  </Link>
                ))}

                {/* Display matched categories */}
                {matchedContents?.matchedCategories?.map((brand) =>
                  brand.products?.map(
                    (product, index) =>
                      product.category && (
                        <Link
                          key={index}
                          className="border-b"
                          href={`/products/${product.name + product.id}?brand=${
                            brand.companyName
                          }&genre=${brand.genre}&productId=${
                            product.id
                          }&brandId=${brand.userId}&brandName=${
                            brand.companyName
                          }`}
                          onClick={() => setIsMatchedModelOpen(false)}
                        >
                          <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                            {product.category}
                          </div>
                        </Link>
                      )
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        <ul className="flex items-center flex-shrink-0 space-x-6 text-gray-700 justify-center">
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="hidden max-sm:block text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-5 h-5 -mb-1"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {User ? (
            <li className="relative">
              <button
                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                onClick={toggleProfileMenu}
                onKeyDown={closeProfileMenu}
                aria-label="Account"
                aria-haspopup="true"
              >
                {User.photoURL ? (
                  <Image
                    className="object-cover w-8 h-8 rounded-full"
                    src={User.photoURL}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                  />
                ) : (
                  <Image
                    className="object-cover w-8 h-8 rounded-full"
                    src={`https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82`}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                  />
                )}
              </button>
              {isProfileMenuOpen && (
                <ul
                  className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark2border-gray-700 dark2text-gray-300 dark2bg-gray-700"
                  aria-label="submenu"
                >
                  <li className="flex">
                    <Link
                      className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark2hover:bg-gray-800 dark2hover:text-gray-200"
                      href=""
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li className="flex">
                    <div
                      className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark2hover:bg-gray-800 dark2hover:text-gray-200"
                      href="#"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>Settings</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Link
                      className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark2hover:bg-gray-800 dark2hover:text-gray-200"
                      href=""
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                      </svg>
                      <span onClick={() => auth.signOut()}>Logout</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <button
              onClick={handleLoginWithGoogle}
              className="rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-400"
            >
              Login
            </button>
          )}
          <button
            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple hidden"
            onClick={toggleSideMenu}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </ul>
      </div>
    </header>
  );
};

export default Header;
