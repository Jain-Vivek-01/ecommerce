"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { addCard } from "@/store/slice/addCardSlice";

export default function ItemsByCategory({ props }) {
  const [imageNumber, setImageNumber] = useState(0);

  return (
    <Link href={`/products/${props.id}`}>
      <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden m-4 hover:shadow-2xl transition-shadow duration-300">
        <div className="relative w-full h-64">
          <Image
            src={props.images[imageNumber]}
            alt={`${props.category} image`}
            fill
            className="object-contain"
          />

          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
            onClick={() => setImageNumber((prev) => Math.max(prev - 1, 0))}
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
          </button>

          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
            onClick={() =>
              setImageNumber((prev) =>
                Math.min(prev + 1, props.images.length - 1)
              )
            }
          >
            <ArrowRightIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {props.title}
          </h2>
          <p className="text-gray-500 text-sm mb-4 line-clamp-3">
            {props.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Price:</span>
            <span className="text-red-500 font-bold text-xl bg-yellow-100 px-2 py-1 rounded">{`$${props.price}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
