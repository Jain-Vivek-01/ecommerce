import api, { localApi } from "@/lib/axios";
import Link from "next/link";
export const dynamic = "force-static";

export default async function CategoriesItems() {
  const res = await api.get("/categories");
  const data = res.data;

  return (

    <div>
    <h1 className="text-center bg-black text-2xl font-bold tracking-wide py-2  text-blue-500 h-13">Categories</h1>
    <div className="grid grid-cols-4 gap-8 bg-gradient-to-br from-blue-200 to blue-700 p-10">
                        

      {data.map((item, i) => {
        return (
          <div key={i}>
            <Link
              className="

              block h-40 w-40 
              bg-gradient-to-br from-yellow-500 to-900
              px-10 py-5 gap-6 text-blue-800 font-bold 
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
