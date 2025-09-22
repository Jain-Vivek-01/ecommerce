import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function CartButton() {
  const totalItems = useSelector(state=> state?.addToCart?.cartItems);
  return (
    <button className=" relative rounded-full p-2 bg-100 text-gray-700 mr-3  flex items-center justify-center   transform transition duration-300 hover:scale-115 hover:bg-gray-300">
      <ShoppingCartIcon className="h-7 w-7 text-gray-700 " />
      <span className="absolute -top-1 -right-1 bg-red-500 text-xxl text-white w-4 rounded-full">
        {totalItems?.length>0? totalItems?.length: ''}
      </span>
    </button>
  );
}
