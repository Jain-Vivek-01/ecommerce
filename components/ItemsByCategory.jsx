"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { addCard } from "@/store/slice/addCardSlice";
import { useDispatch } from "react-redux";
import { Skeleton } from "@radix-ui/themes";

export default function ItemsByCategory({ props, loading }) {
  const [imageNumber, setImageNumber] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className="relative mx-auto w-70">
      <button
        className="absolute -left-1 top-1/3 z-30 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
        onClick={() => setImageNumber((prev) => Math.max(prev - 1, 0))}
      >
        <ArrowLeftIcon className="w-4 h-4  text-red-900" />
      </button>

      <Link href={`/products/${props?.id}`}>
        <div className="relative cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden m-2 hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-70 h-60">
            {loading ? (
              <Skeleton
                width="100%"
                style={{
                  height: "100%",
                  borderRadius: "8px",
                  backgroundColor: "#e5e7eb",
                }}
              />
            ) : (
              props?.images?.[imageNumber] && (
                <Image
                  src={props?.images?.[imageNumber]}
                  alt={`${props?.category} image`}
                  fill
                  className="object-contain relative z-10 bg-gray-200"
                  sizes="100px"
                />
              )
            )}
          </div>
          <h2 className="text-sm font-bold text-gray-800 p-2">
            <Skeleton loading={loading}>{props?.title} </Skeleton>
          </h2>{" "}
        </div>
      </Link>

      <div className="p-2 mx-2">
        <p className="text-gray-500 text-xs mb-2 line-clamp-3">
          {loading ? (
            <Skeleton className="h-4 w-3/4 rounded" />
          ) : (
            props.description
          )}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-red-500 font-bold text-sm bg-yellow-100 px-2 py-1 rounded">
            {" "}
            {loading ? (
              <Skeleton className="h-4 w-1/4 rounded" />
            ) : (
              `$${props.price}`
            )}
          </span>

          {loading ? (
            <Skeleton className="h-5 w-10 bg-gray-600" />
          ) : (
            <button
              onClick={() => dispatch(addCard(props))}
              className="z-30 bg-blue-300 p-1 rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-blue-500 px-2 text-xs"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>

      <button
        className="absolute z-10 top-1/3 -right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
        onClick={() =>
          setImageNumber((prev) => Math.min(prev + 1, props?.images.length - 1))
        }
      >
        <ArrowRightIcon className="size-4 text-red-900 text-gray-700" />
      </button>
    </div>
  );
}
