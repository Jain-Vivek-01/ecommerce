"use client";

import api from "@/lib/axios";
import { useEffect, useState, useRef } from "react";
import ItemsByCategory from "./ItemsByCategory";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [hasData, setHasData] = useState(true);
  const isFetchingRef = useRef(false);
  const SkikProductRef = useRef(0);

  async function fetchResponse() {
    if (!hasData || isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;

      const increment = SkikProductRef.current;

      const res = await api.get(`?limit=12&skip=${increment}`); 

      const result = res.data.products;
      SkikProductRef.current += result.length;

      setProductData((prev) => {
        const existingIds = new Set(prev.map((i) => i.id));
        const newItems = result.filter((item) => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });

      // setProductData(prev => {

      //   const data = [...prev];
      //   const newItems = result.filter(item=> !data.map(i=> i.id).includes(item.id));
      //   return([...data,...newItems]);

      // })

      if (result.length < 12) {
        setHasData(false);
      }
    } catch (err) {
      console.log("err in product", err);
    } finally {
      isFetchingRef.current = false;
    }
  }

  useEffect(() => {
    fetchResponse();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 50
      ) {
        fetchResponse();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasData, SkikProductRef]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {productData?.map((item, i) => (
        <ItemsByCategory key={`${item.id}-${i}`} props={item} loading={false} />
      ))}

      {isFetchingRef.current &&
        Array.from({ length: 12 }).map((_, index) => (
          <ItemsByCategory key={index} loading={isFetchingRef.current} />
        ))}

      {!hasData && (
        <p className="col-span-full text-center">No more products</p>
      )}
      <button
        className="fixed bg-blue-200 bottom-1 right-1/2 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all transform hover:scale-110 z-30"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ArrowUpIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
