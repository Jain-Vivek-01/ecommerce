"use client";

import api from "@/lib/axios";
import { useState, useEffect } from "react";
import ItemsByCategory from "@/components/productDetailPage";
import { use } from "react";

export default function Category({ params }) {
  const { id } = use(params);


  const [productData, setProductData] = useState([]);
  const [offset, setOffSet] = useState(0);
  const [hasData, setHasData] = useState(true);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    if (!hasData || loading) return;

    setLoading(true);
    try {
      const res = await api.get(
        `/category/${id}?limit=12&skip=${offset}`
      );
      const result = res.data.products;

      setProductData((prev) => {
        const newData = [...prev];
        const newItems = result.filter(
          (item) => !newData.map((item) => item.id).includes(item.id)
        );
        return [...newData, ...newItems];
      });

      setOffSet((prev) => prev + 12);

      if (result.length < 12) {
        setHasData(false);
      }
    } catch (err) {
      console.error("error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50 &&
        hasData &&
        !loading
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasData, loading]);
  return (
    <div>
      <h1 className="h-15 text-center text-xl md:text-2xl lg:text-3xl font-bold tracking-wide max-w-lg rounded-xl m-5 pt-3 shadow-lg bg-yellow-300 mx-auto text-gray-800">
        {`Category: ${id}`}
      </h1>

      <div className="bg-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {productData.length === 0 && !loading ? (
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-bold px-4 py-6 rounded-xl mx-auto text-center shadow max-w-lg bg-yellow-300">
            no product found
          </p>
        ) : (
          productData.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <ItemsByCategory props={item} loading={loading} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
