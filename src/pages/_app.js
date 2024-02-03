import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { auth } from "@/db/firebase";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
      console.log(authUser);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#f1f2f4]">
      <Header User={user} />
      <div className="pt-[120px] mx-4">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
