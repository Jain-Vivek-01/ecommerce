"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import ItemsByCategory from "./ItemsByCategory";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Products() {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasData, setHasData] = useState(true);
  const [loading, setLoading] = useState(false);

  async function fetchResponse() {
    if (!hasData || loading) return;

    try {
      setLoading(true);
      const res = await api.get(`?limit=10&skip=${skip}`);
      const result = res.data.products || [];

      setData((prev) => [...prev, ...result]);
      setSkip((prev) => prev + 10);

      if (result.length === 0) {
        setHasData(false);
      }
    } catch (err) {
      console.log("err in product", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResponse();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        fetchResponse();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

     


      {data?.map((item, i) => (
        <ItemsByCategory key={`${item.id}-${i}`} props={item}  />
      ))}

      {loading && Array.from({length:12}).map((_,index)=>(
        <ItemsByCategory key={index} loading={loading}  />
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
