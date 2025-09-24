"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { removeFromWishlist } from "@/store/slice/wishlistSlice";
import { addCard } from "@/store/slice/addCardSlice";

export default function wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  if (!wishlist || wishlist.length === 0) {
    return <p className="text-gray-500 text-lg">Your wishlist is empty 💔</p>;
  }

  return (
     <div className="flex  min-h-screen justify-center bg-gray-100 ">
    <div className="divide-y p-10 shadow-lg rounded-lg">
     
      {wishlist.map((item) => (
        <div key={item.id} className="flex items-center rounded-lg my-3 justify-around gap-8 py-4 bg-gray-200 transition duration-300 hover:bg-white ">
          {/* Image */}
          <Link href={`/products/${item.id}`}>
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={80}
              height={80}
              className="object-contain rounded-md"
            />
          </Link>

          {/* Details */}
          <div className="flex-1  mr-10">
            <Link href={`/products/${item.id}`}>
              <span className="block font-semibold truncate max-w-[200px] hover:underline">
                {item.title}
              </span>
            </Link>
            <span className="text-sm text-gray-500">{item.category}</span>
          </div>
          <div className="h-20 w-35">
            <button
              onClick={() => dispatch(addCard(item))}
              className="border bg-blue-300 text-md text-white font-semibold tracking-wide transform translation-all duration-300 hover:scale-110 hover:bg-blue-500 hover:shadow-wide p-2 rounded-lg m-2"
            >
              Add to cart
            </button>

            {/* Remove button */}
            <button
              onClick={() => dispatch(removeFromWishlist(item.id))}
              className="text-red-300 font-medium transition hover:text-red-600 ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
