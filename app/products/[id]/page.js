import FinalProductPage from "@/components/FinalProductPage";

export default function FinalProduct({ params }) {
  const { id } = params;

  return <FinalProductPage id={id} />;
}
