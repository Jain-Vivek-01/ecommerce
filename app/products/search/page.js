"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ItemsByCategory from "@/components/ItemsByCategory";

export default function search() {
  const [ProductData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = useSearchParams();
  const query = search.get("q");

  useEffect(() => {
    responseData();
  }, [query]);

  async function responseData() {
    if (!query) {
      return;
    }
    const res = await api.get(`/search?q=${encodeURIComponent(query)}`);
    const result = res.data.products;
    setProductData(result);
    setLoading(false);
  }

  return (
    <div className=" ">
      <div className="p-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 bg-yellow-300 px-6 py-4 rounded-xl shadow-md max-w-2xl mx-auto">
          Getting results for <span className="text-gray-900">“{query}”</span>
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-2 ">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ItemsByCategory key={`${i}`} loading={loading} />
            ))
          : ProductData.map((item, index) => (
              <ItemsByCategory
                key={`${item.id}-${index}`}
                props={item}
                loading={false}
              />
            ))}
      </div>
    </div>
  );
}
