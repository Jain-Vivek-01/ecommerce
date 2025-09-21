"use client";

import api from "@/lib/axios";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ItemsByCategory from "@/components/ItemsByCategory";

export default function () {
  const [data, setData] = useState([]);

  const pathName = usePathname();
  const segment = pathName.split("/").filter(Boolean);
  const last = segment[segment.length - 1];

  useEffect(() => {
    async function fetchData() {
      if (!last) return;

      const res = await api.get(`/category/${last}?limit=10`);
      const result = res.data;
      setData(result);
    }

    fetchData();
  }, [last]);

  return (
    <div className="">
      <h1 className="h-15 text-center text-3xl font-bold tracking-wide shadow-md text-gray-800">
        {" "}
        {last}
      </h1>

      <div className="bg-gray-200 grid grid-cols-3 gap-10 p-5">
        {data.length === 0 ? (
          <p>no product found</p>
        ) : (
          data.products.map((items) => {
            {
              console.log("items.id: ");
            }
            return (
              <div className="" id={items.id}>
                {" "}
                {<ItemsByCategory props={items} />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
