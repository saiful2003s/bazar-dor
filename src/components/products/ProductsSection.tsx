import { IProduct } from "@/types/type";
import ProductCard from "@/components/products/ProductsCard";
import React from "react";

const ProductSections = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!res.ok) {
        throw new Error("Products fetch failed");
    }

    const products: IProduct[] = await res.json();

    // Top 6 Price Risers
    const risers = [...products]
        .filter((product) => product.change.pct > 0)
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    // Top 6 Price Fallers
    const fallers = [...products]
        .filter((product) => product.change.pct < 0)
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    // Reusable Section
    const renderSection = (
        title: React.ReactNode,
        items: IProduct[]
    ) => (
        <section className="mb-14">
            {/* Section Heading */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {title}
                </h2>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {items.length === 0 && (
                <p className="py-8 text-center text-gray-500">
                    কোনো পণ্য পাওয়া যায়নি।
                </p>
            )}
        </section>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">

            {/* Section A */}
            {renderSection(
                <span>
                    <span className="text-red-600">▲ </span>
                    আজ দাম বেড়েছে
                </span>,
                risers
            )}

            {/* Section B */}
            {renderSection(
                <span>
                    <span className="text-green-600">▼ </span> আজ দাম কমেছে
                </span>,
                fallers
            )}

            {/* Section C */}
            <section id="সব-পণ্য" className="scroll-mt-24">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        সব পণ্য
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 md:text-base">
                        {`মোট ${products.length} টি পণ্য দেখানো হচ্ছে`}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ProductSections;