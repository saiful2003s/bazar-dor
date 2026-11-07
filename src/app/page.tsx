import HeroPage from "@/components/Hero";
import ProductsSection from "@/components/products/ProductsSection";
import { Suspense } from "react";


export default function Home() {
  return (
    <div className="bg-base-300">
      <div className="container mx-auto ">
        <HeroPage />
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsSection />
        </Suspense>
      </div>
    </div>
  );
}
