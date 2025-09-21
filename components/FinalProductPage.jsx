"use client";

import api from "@/lib/axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addCard } from "@/store/slice/addCardSlice";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon } from "@heroicons/react/24/solid";
import { removeFromWishlist, addToWishlist } from "@/store/slice/wishlistSlice";
import Reviews from "./Reviews";

export default function FinalProductPage({ id }) {
  const [imageNumber, setImageNumber] = useState(0);
  const [resData, setResData] = useState({ images: [], reviews: [] });
  const dispatch = useDispatch();

  const value = useSelector((state) => state?.addToCart?.cartItems);
  const wishlist = useSelector((state) => state?.wishlist?.wishlistItems);
  const isWishlisted = wishlist?.some((item) => item.id === resData.id);

  function handleWishlist() {
    if (isWishlisted) {
      dispatch(removeFromWishlist(resData.id));
    } else {
      dispatch(addToWishlist(resData));
    }
  }

  function handleAddCart() {
    dispatch(
      addCard({
        id: resData.id,
        images: resData.images,
        price: resData.price,
        discount: resData.discountPercentage,
        deliver: resData.shippingInformation,
        title: resData.title,
        quantity: 1,
      })
    );
  }

  function handleNext() {
    if (!resData.images) return;
    setImageNumber((prev) =>
      prev === resData.images.length - 1 ? 0 : prev + 1
    );
  }

  function handlePrev() {
    if (!resData.images) return;
    setImageNumber((prev) =>
      prev === 0 ? resData.images.length - 1 : prev - 1
    );
  }

  useEffect(() => {
    async function responseData() {
      if (!id) return;
      const res = await api.get(`/${id}`);
      const data = res.data;
      setResData(data);
    }
    responseData();
  }, [id]);

  return (
    <div className="bg-gray-100">
      <div className="bg-white min-h-[65vh] py-5 px-5 mx-40 grid grid-cols-[1fr_2fr] gap-6 rounded-lg shadow">
        <div>
          <div className="relative bg-white h-64 w-64 ml-10 rounded-lg shadow">
            <button
              onClick={handlePrev}
              className="absolute z-10 top-1/2 left-0 transform -translate-y-1/2"
            >
              <ArrowLeftIcon className="h-6 w-6 hover:text-blue-600 hover:scale-110 transition" />
            </button>

            <button
              onClick={handleNext}
              className="absolute z-10 top-1/2 right-0 transform -translate-y-1/2"
            >
              <ArrowRightIcon className="h-6 w-6 hover:text-blue-600 hover:scale-110 transition" />
            </button>

            <button
              className="absolute top-2 right-2 h-7 w-7 z-10 text-red-500"
              onClick={handleWishlist}
            >
              {isWishlisted ? <HeartSolid /> : <HeartOutline />}
            </button>

            {resData.images.length > 0 ? (
              <Image
                key={imageNumber}
                src={resData.images[imageNumber]}
                alt={resData.category}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            ) : (
              <p className="text-center text-gray-400">Loading...</p>
            )}
          </div>

          <div className="flex flex-wrap mt-3">
            {resData.images.map((items, i) => (
              <div
                key={i}
                className={clsx(
                  "relative h-20 w-20 border rounded-md m-1 cursor-pointer overflow-hidden",
                  i === imageNumber
                    ? "border-2 border-blue-400"
                    : "border-gray-300"
                )}
                onClick={() => setImageNumber(i)}
              >
                <Image
                  src={items}
                  alt={resData.category}
                  fill
                  className="object-contain"
                  sizes="50px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">{resData.title}</h1>
          <p className="text-gray-600 mt-2">{resData.description}</p>

          <div className="mt-4">
            <span className="text-2xl font-semibold text-red-600">
              ${resData.price}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              ({resData.discountPercentage}% OFF at checkout)
            </span>
          </div>

          <p className="mt-2 text-green-600 font-medium">
            Delivery: {resData.shippingInformation}
          </p>

          <button
            onClick={handleAddCart}
            className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow transition transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="bg-white mx-40 mt-6 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          More Details
        </h2>
        <p className="text-gray-600">
          Warranty: {resData.warrantyInformation}
        </p>
        <p className="text-gray-600">Return Policy: {resData.returnPolicy}</p>
      </div>

      <div className="mx-40 mt-6">
        <Reviews reviews={resData.reviews} />
      </div>
    </div>
  );
}


