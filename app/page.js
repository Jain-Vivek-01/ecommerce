'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

export default function Home() {
  const search = useSelector((state) => state.search.find);
  console.log("search value : ", search);

  return <div className="text-red-600"></div>;
}
