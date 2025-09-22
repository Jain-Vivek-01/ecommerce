"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ItemsByCategory from "@/components/ItemsByCategory";
import { Skeleton } from "@radix-ui/themes";

export default function search() {
  const [data, setData] = useState([]);
  const [loading,setLoading]= useState(true);


  const search = useSearchParams();
  const query = search.get("q");
  console.log(query);

  useEffect(() => {
    responseData();
  }, [query]);

  async function responseData() {
    if (!query) {
      return;
    }
    const res = await api.get(`/search?q=${encodeURIComponent(query)}`);
    const result = res.data.products;
    setData(result);
    setLoading(false);
  }

  console.log(data, "query: ", query);


  return (
    <div>
      <h2 className="text-center font-semibold text-gray-500">
        {" "}
        {`Getting results for ${query}`}{" "}
      </h2>

      <div className="grid grid-cols-4 gap-2 ">

    { loading ?   (
      Array.from({length:8}).map((_,i)=>(

          <ItemsByCategory key={`${i}`}  loading={loading}  />

        ))
    ):(data.map((item, index) => (
          
          <ItemsByCategory key={`${item.id}-${index}`} props={item} loading={loading}  />
        )))   
        }


        
      </div>
    </div>
  );
}
