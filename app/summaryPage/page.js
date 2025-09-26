"use client";
import Summary from "@/components/Summary";
import { useSelector } from "react-redux";

export default function summaryPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  {
    if (!cartItems || cartItems.length == 0)
      return (
        <div className="p-6">
          <p className="text-xl md:text-2xl lg:text-3xl  text-gray-800 font-bold px-4 py-6 rounded-xl mx-auto p-4 text-center shadow max-w-lg bg-yellow-300 ">
            Your cart is empty
          </p>
        </div>
      );
  }
  return (
    <div>
      {" "}
      <Summary />
    </div>
  );
}
