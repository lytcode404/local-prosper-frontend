import Link from "next/link";
import Image from "next/image";
export const Footer = () => {
  return (
    <>
      <footer className="">
        <div className="py-6 bg-blue-100 text-white">
          <div className="px-4 mx-auto max-w-7xl md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <div className="text-center md:text-left mb-3 md:mb-0">
                <span className="text-heading font-bold uppercase tracking-widest">
                  Newsletter
                </span>
                <p className="text-subHeading">Subscribe to our newsletter</p>
              </div>
              <form className="w-full md:max-w-md flex gap-2">
                <input className="w-full flex-1 text-btnTxt border border-btnBodr focus:ring rounded outline-none transition duration-100 px-3 py-2" />
                <button className="inline-block bg-btn hover:bg-btnHoverr text-sm font-semibold text-center rounded outline-none transition duration-100 px-8 py-2  md:text-base">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="pt-12 lg:pt-16">
          <div className="px-4 mx-auto max-w-7xl md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
              <div className="col-span-full lg:col-span-2">
                <div className="lg:-mt-2 mb-4">
                  <Link
                    className="inline-flex items-center text-black-800 text-xl md:text-2xl font-bold gap-2"
                    href="#"
                  >
                    <span className="w-5 h-auto">
                      <div
                        style={{
                          fontSize: "inherit",
                          color: "inherit",
                          padding: "2px",
                        }}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M179.2 230.4l102.4 102.4-102.4 102.4L0 256 179.2 76.8l44.8 44.8-25.6 25.6-19.2-19.2-128 128 128 128 51.5-51.5-77.1-76.5 25.6-25.6zM332.8 76.8L230.4 179.2l102.4 102.4 25.6-25.6-77.1-76.5 51.5-51.5 128 128-128 128-19.2-19.2-25.6 25.6 44.8 44.8L512 256 332.8 76.8z"></path>
                        </svg>
                      </div>
                    </span>
                    <span> Paronama by Phoenix Ventures</span>
                  </Link>
                </div>
                <p className=" sm:pr-8 mb-6">
                  Filler text is dummy text which has no meaning however looks
                  very similar to real text
                </p>
                <div className="flex gap-4">
                  <Link className="transition duration-100" href="#">
                    <span className="w-5 h-5">
                      <div
                        style={{
                          fontSize: "inherit",
                          color: "inherit",
                          padding: "2px",
                        }}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 496 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm-70.7 372c-68.8 0-124-55.5-124-124s55.2-124 124-124c31.3 0 60.1 11 83 32.3l-33.6 32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9 0-77.2 35.5-77.2 78.1s34.2 78.1 77.2 78.1c32.6 0 64.9-19.1 70.1-53.3h-70.1v-42.6h116.9c1.3 6.8 1.9 13.6 1.9 20.7 0 70.8-47.5 121.2-118.8 121.2zm230.2-106.2v35.5H372v-35.5h-35.5v-35.5H372v-35.5h35.5v35.5h35.2v35.5h-35.2z"></path>
                        </svg>
                      </div>
                    </span>
                  </Link>
                  <Link className=" transition duration-100" href="#">
                    <span className="w-fit">
                      <svg
                        className="w-5 h-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    className=" hover: active:text-gray-600 transition duration-100"
                    href="#"
                  >
                    <span className="w-fit">
                      <svg
                        className="w-5 h-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    className=" hover: active:text-gray-600 transition duration-100"
                    href="#"
                  >
                    <span className="w-5 h-5">
                      <div
                        style={{
                          fontSize: "inherit",
                          color: "inherit",
                          padding: "2px",
                        }}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                        </svg>
                      </div>
                    </span>
                  </Link>
                </div>
              </div>
              <div>
                <p className=" font-bold tracking-widest uppercase mb-4">
                  Products
                </p>
                <nav className="flex flex-col gap-4">
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Overview
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Solutions
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Pricing
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Customers
                    </Link>
                  </div>
                </nav>
              </div>
              <div>
                <p className=" font-bold tracking-widest uppercase mb-4">
                  Company
                </p>
                <nav className="flex flex-col gap-4">
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      About
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Investor Relations
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Jobs
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Press
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Blog
                    </Link>
                  </div>
                </nav>
              </div>
              <div>
                <p className=" font-bold tracking-widest uppercase mb-4">
                  Support
                </p>
                <nav className="flex flex-col gap-4">
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Contact
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Documentation
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Chat
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      FAQ
                    </Link>
                  </div>
                </nav>
              </div>
              <div>
                <p className=" font-bold tracking-widest uppercase mb-4">
                  Legal
                </p>
                <nav className="flex flex-col gap-4">
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Terms of Service
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                      href="#"
                    >
                      Cookie settings
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
            <p className="text-heading text-sm text-center border-t py-8">
              © 2023 - Present rdilshad3559@gmail.com . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
