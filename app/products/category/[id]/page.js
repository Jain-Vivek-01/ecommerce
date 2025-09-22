"use client";

import api from "@/lib/axios";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ItemsByCategory from "@/components/ItemsByCategory";

export default function () {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasData, setHasData] = useState(true);

  const pathName = usePathname();
  const segment = pathName.split("/").filter(Boolean);
  const last = segment[segment.length - 1];

  useEffect(()=>{
    fetchData();
  },[]);

  async function fetchData() {
    if (!hasData) {
      return;
    }

    try {
      const res = await api.get(`/category/${last}?limit=12&skip=${skip}`);
      const result = res.data.products;
      console.log("result",result);
      setData(prev => [...prev, ...result]);
      setSkip((prev) => prev + 12);
      if (result.length == 0) {
        setHasData(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  useEffect(() => {
    if (!last) {
      return;
    }
    const handleScroll = ()=>{
  if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 30
    ) {
      fetchData();
    }

    };
 
  

  window.addEventListener("scroll",handleScroll)
  return ()=> removeEventListener("scroll",handleScroll)}

   
  , [last, skip,data]);

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
          data.map((items,index) => {
           
            return (
              <div className="" key={`${items.id}-${index}`} >
                {" "}
                {<ItemsByCategory  props={items} />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
