"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { addCard,removeFromCart } from "@/store/slice/addCardSlice";

export default function Summary() {
  const data = useSelector((state) => state.addToCart.cartItems);
  console.log("summary data",data);

  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-lg">Your cart is empty</p>;
  }

const dispatch = useDispatch();


  const cartSummary = useMemo(() => {
    return data.reduce(
      (sum, item) => {
        const quantity = Number(item?.quantity) || 0;
        const price = Number(item?.price) || 0;
        const discount = Number(item?.discount) || 0;

        sum.totalQuantity += quantity;
        sum.totalPriceBeforeDiscount += price * quantity;
        sum.totalDiscount += ((price * discount) / 100) * quantity;
        sum.finalPrice += (price - (price * discount) / 100) * quantity;

        return sum;
      },
      {
        totalQuantity: 0,
        totalPriceBeforeDiscount: 0,
        totalDiscount: 0,
        finalPrice: 0,
      }
    );
  }, [data]);

{if(!data || data.length==0)return<p>Cart is empty</p>}

  return (
    <div className="max-w-9xl  mx-auto px-4  flex justify-between divide-x  sm:w-xl md:w-3xl lg:w-7xl ">
      <div className="divide-y w-200 sm:w-400 lg:w-500 xl:600 p-2 sm:p-4 lg:p-6 lg:p-8">
        {data.map((items) => {
          const discountedPrice = (
            items.price -
            (items.price * items.discount) / 100
          ).toFixed(2);

          return (
            <div key={items.id} className="flex items-center gap-4 py-4">
              {/* Image */}
              <Link href={`/products/${items.id}`}>
                <Image
                  src={items.images[0]}
                  alt={items.title}
                  width={100}
                  height={100}
                  className="object-contain rounded-md"
                />
              </Link>

              {/* Details */}
              <div className="flex-1">
                <Link href={`/products/${items.id}`}>
                  <span className="block font-semibold truncate max-w-[200px] hover:underline">
                    {items.title}
                  </span>
                </Link>
                <span className="text-sm text-gray-500">{items.deliver}</span>
              </div>

              <div className="flex flex-1">
                <button onClick={()=>{dispatch(removeFromCart(items))}}  className="text-gray-600 border rounded-full m-3 p-1 transform transition hover:scale-110 hover:bg-blue-300">
                  <MinusIcon className="h-3 w-3" />
                </button>
                <span className="font-semibold block border text-gray-500 m-3 p-1 w-6 h-8 text-center">
                  { items.quantity?? 0}
                </span>
                <button onClick={()=>dispatch(addCard(items))} className="text-gray-600 border rounded-full m-3 p-1 transform transition hover:scale-110 hover:bg-green-300">
                  <PlusIcon className="h-3 w-3" />
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <span className="line-through text-gray-400 block">
                  ${items.price.toFixed(2)}
                </span>
                <span className="font-bold text-blue-600 block">
                  ${discountedPrice}
                </span>
                <span className="text-green-600 font-bold text-sm">
                  {items.discount}% off
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <span className="block font-semibold text-gray-400 text-base  sm:text-sm  lg:text-lg xl:text-xl max-w-xl sm:w-30 md:w-60 lg:w-80 xl:w-100 text-center pt-5 ">
          Product details
        </span>

        <div className="font-normal sm:m-1 sm:p1 md:p-2 md:m-2  lg:m-3 lg:p-4 xl:p-5 xl:m-5">
          <div className="flex justify-between lg:p-1 lg:m-1 xl:p-2 xl:m-2">
            {" "}
            <span>{`Price (${cartSummary.totalQuantity} items) : `}</span>{" "}
            <span>{`$${cartSummary.totalPriceBeforeDiscount.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between lg:p-1 lg:m-1 xl:p-2 xl:m-2">
            <span>{`Discount: `}</span>
            <span className="text-green-500 font-medium">
              {" "}
              {`-${cartSummary.totalDiscount.toFixed(0)}`}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-b border-gray-200 lg:p-1 lg:m-1 xl:p-2 xl:m-2 ">
            <span className="">Total Amount </span>
            <span>{cartSummary.finalPrice.toFixed(0)}</span>
          </div>
          <div className="text-green-600 font-medium text-center lg:p-1 lg:m-1 xl:p-2 xl:m-2">{`You will save $${cartSummary.totalDiscount.toFixed(
            0
          )} on this order`}</div>
        </div>
      </div>
    </div>
  );
}
