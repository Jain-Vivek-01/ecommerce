import api, { localApi } from "@/lib/axios";
import Link from "next/link";
export const dynamic = "force-static";

export default async function CategoriesItems() {
  const res = await api.get("/categories");
  const productCategories = res.data;

  return (

    <div>
      <h1 className="text-center text-xl md:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide py-4 px-6  text-gray-800 h-20">Categories</h1>
      <div className="grid grid-cols-4 gap-8 bg-gradient-to-br from-blue-200 to blue-700 p-10">


        {productCategories?.map((item, i) => {
          return (
            <div key={i}>
              <Link
                className="

              block h-40 w-40 text-center 
              bg-gradient-to-br from-yellow-500 to-900
              px-4 pl-9 py-5 gap-6 text-blue-800 font-bold 
              transform transition-all duration-300
              shadow-md hover:shadow-xl hover:scale-90 hover:translate-y-2 
              flex justify-center rounded-full items-center "
                href={`/products/category/${item.slug}`}
              >
                {" "}
                {<span className="transform transition-all hover:text-white hover:-translate-y-2">{item.name}</span>}{" "}

              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
