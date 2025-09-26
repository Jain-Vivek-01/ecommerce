"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SimilarProducts({ tags }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/category/${tags}?limit=12`);
      const categoryProduct = res.data.products;
      setSimilarProducts(categoryProduct);
    }

    fetchData();
  }, [tags]);

  if (similarProducts.length === 0) return null; 

  return (
    <div>
      <h2 className="text-center font-semibold text-lg mt-5">Similar Products</h2>
      <div className="p-2 flex justify-center mt-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {similarProducts.map((items) => (
            <Link
              href={`/products/${items.id}`}
              key={items.id}
              className="block"
            >
              <div className="bg-gray-300 p-4 border h-40 w-40 flex flex-col justify-between rounded hover:shadow-lg transition">
                <div className="relative h-20 w-full">
                  <Image
                    src={items.thumbnail}
                    alt={items.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-sm truncate">{items.title}</span>
                  <span className="font-semibold">${items.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
