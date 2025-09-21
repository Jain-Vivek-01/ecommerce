import api from "@/lib/axios";
export const dynamic = "force-static"

export default async function categories() {
     const res = await api.get("/category-list");
  console.log(res.data);

  return <div>categories</div>;
}
