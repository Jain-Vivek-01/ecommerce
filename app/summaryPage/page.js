"use client";
import Summary from "@/components/Summary";
import { Skeleton } from "@radix-ui/themes";
import { useSelector } from "react-redux";

export default function summaryPage() {
  const cartData = useSelector((state) => state.addToCart.cartItems);

  {
    if (!cartData || cartData.length == 0) return <p>Cart is empty</p>;
  }
  return (
    <div>
      {" "}
      <Skeleton>
        {" "}
        <Summary />
      </Skeleton>{" "}
    </div>
  );
}
