"use client";

import { useState } from "react";
import { searchItem } from "@/store/slice/searchSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import CartButton from "./CartButton";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const router = useRouter();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchItem(value));
    setValue("");
    router.push(`/products/search?q=${encodeURIComponent(value)}`);

  };

  return (
    <header className="bg-yellow-500 shadow-lg">
      <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-between">
       
        <Link
          href="/"
          className="text-2xl font-extrabold text-gray-900 tracking-wider hover:text-blue-800 transition"
        >
          MyShop 🛒
        </Link>

        <nav className="flex items-center space-x-6">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-full shadow px-3 py-1"
          >
            <input
              placeholder="Search products..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="outline-none px-2 py-1 text-sm w-48 sm:w-64"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded-full ml-2 hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          <Link
            href="/products"
            className="text-gray-800 font-medium hover:text-blue-700 transition"
          >
            Products
          </Link>
          <Link
            href="/products/categories"
            className="text-gray-800 font-medium hover:text-blue-700 transition"
          >
            Categories
          </Link>
          <Link
            href="/wishlist"
            className="text-gray-800 font-medium hover:text-blue-700 transition"
          >
            Wishlist
          </Link>
          <Link
            href="/summaryPage"
            className="text-gray-800 font-medium hover:text-blue-700 transition"
          >
            <CartButton/>
          </Link>
        </nav>
      </div>
    </header>
  );
}
