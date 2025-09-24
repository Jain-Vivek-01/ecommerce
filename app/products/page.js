import ProductsList from "@/components/ProductsList";
export default function Products() {
  return (
    <div>
      <h1 className="text-center font-bold px-2 py-6 text-gray-800 text-xl md:text-2xl lg:3xl xl:4xl w-xs max-w-lg tracking-wide mx-auto bg-gray-300 my-4 rounded-xl shadow">
        All products
      </h1>
      <ProductsList />
    </div>
  );
}