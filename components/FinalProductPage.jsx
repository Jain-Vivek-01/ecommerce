"use client";

import api from "@/lib/axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addCard } from "@/store/slice/addCardSlice";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { removeFromWishlist, addToWishlist } from "@/store/slice/wishlistSlice";
import Reviews from "./Reviews";
import { Skeleton } from "@radix-ui/themes";

export default function FinalProductPage({ id }) {
  const [imageNumber, setImageNumber] = useState(0);
  const [productData, setProductData] = useState({ images: [], reviews: [] });
  const [loader, setLoader] = useState(true);

  const wishlist = useSelector((state) => state?.wishlist?.wishlistItems);
  const isWishlisted = wishlist?.some((item) => item.id === productData.id);
  const dispatch = useDispatch();

  function handleWishlist() {
    if (isWishlisted) {
      dispatch(removeFromWishlist(productData.id));
    } else {
      dispatch(addToWishlist(productData));
    }
  }

  function handleAddCart() {
    dispatch(
      addCard({
        id: productData.id,
        images: productData.images,
        price: productData.price,
        discount: productData.discountPercentage,
        deliver: productData.shippingInformation,
        title: productData.title,
        quantity: 1,
      })
    );
  }

  function handleNext() {
    if (!productData.images) return;
    setImageNumber((prev) =>
      prev === productData.images.length - 1 ? 0 : prev + 1
    );
  }

  function handlePrev() {
    if (!productData.images) return;
    setImageNumber((prev) =>
      prev === 0 ? productData.images.length - 1 : prev - 1
    );
  }

  useEffect(() => {
    async function responseData() {
      if (!id) return;
      const res = await api.get(`/${id}`);
      const data = res.data;
      setProductData(data);
      setLoader(false);
    }
    responseData();
  }, [id]);

  return (
    <div className="bg-gray-100">
      <div className="bg-white min-h-[65vh] py-5 px-5 mx-40 grid grid-cols-[1fr_2fr] gap-6 rounded-lg shadow">
        <div>
          <Skeleton loading={loader}>
            <div className="relative bg-white h-64 w-64 ml-10 rounded-lg shadow ">
              <button
                onClick={handlePrev}
                className="absolute z-0 top-1/2 left-0 transform -translate-y-1/2"
              >
                <ArrowLeftIcon className="h-6 w-6 hover:text-blue-20 hover:scale-110 transition" />
              </button>

              <button
                onClick={handleNext}
                className="absolute z-30 top-1/2 right-0 transform -translate-y-1/2"
              >
                <ArrowRightIcon className="h-6 w-6 hover:text-blue-600 hover:scale-110 transition" />
              </button>

              <button
                className="absolute top-2 right-2 h-7 w-7 z-30 text-red-500"
                onClick={handleWishlist}
              >
                {isWishlisted ? <HeartSolid /> : <HeartOutline />}
              </button>

              {productData?.images?.[imageNumber] && (
                <Image
                  key={`${productData.id}-${imageNumber}`}
                  src={productData?.images?.[imageNumber]}
                  alt={productData.category}
                  fill
                  className="object-contain p-2 pointer-events-none "
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              )}
            </div>
          </Skeleton>

          <div className="flex flex-wrap gap-2 mt-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                loading={loader}
                sizes="75"
                className="mt-4"
                key={index}
              />
            ))}
            {productData?.images?.map((items, i) => (
              <div
                key={i}
                className={clsx(
                  "relative h-20 w-20 border rounded-md m-1 cursor-pointer overflow-hidden p-1",
                  i === imageNumber
                    ? "border-2 border-blue-400"
                    : "border-gray-300"
                )}
                onClick={() => setImageNumber(i)}
              >
                <Image
                  src={items}
                  alt={productData.category}
                  fill
                  className="object-contain"
                  sizes="50px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            <Skeleton height="30px" width="190px" loading={loader}>
              {productData.title}
            </Skeleton>
          </h1>
          <p className="text-gray-600 mt-2">
            <Skeleton height="30px" loading={loader}>
              {productData.description}
            </Skeleton>
          </p>

          <div className="mt-4">
            <Skeleton height="30px" loading={loader}>
              {" "}
              <span className="text-2xl font-semibold text-red-600">
                ${productData.price}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                ({productData.discountPercentage}% OFF at checkout)
              </span>
            </Skeleton>
          </div>

          <Skeleton height="30px" loading={loader}>
            {" "}
            <p className="mt-2 text-green-600 font-medium">
              Delivery: {productData.shippingInformation}
            </p>
          </Skeleton>
          <Skeleton loading={loader}>
            <button
              onClick={handleAddCart}
              className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow transition transform hover:scale-105"
            >
              Add to Cart
            </button>
          </Skeleton>
        </div>
      </div>

      <div className="bg-white mx-40 mt-6 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          More Details
        </h2>
        <p className="text-gray-600">
          Warranty: {productData.warrantyInformation}
        </p>
        <p className="text-gray-600">
          Return Policy: {productData.returnPolicy}
        </p>
      </div>

      <div className="mx-40 mt-6">
        <Reviews reviews={productData.reviews} />
      </div>
    </div>
  );
}
