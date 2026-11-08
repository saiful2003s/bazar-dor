
"use client";

import { useMemo, useState } from "react";
import { IProduct } from "@/types/type";
import ProductCard from "@/components/products/ProductsCard";

interface CategoryProductsProps {
    products: IProduct[];
}

const CategoryProducts = ({
    products,
}: CategoryProductsProps) => {

    const [sortBy, setSortBy] = useState("default");

    // Sort Products
    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sortBy === "low-to-high") {
            return result.sort(
                (a, b) => a.today - b.today
            );
        }

        if (sortBy === "high-to-low") {
            return result.sort(
                (a, b) => b.today - a.today
            );
        }

        return result;
    }, [products, sortBy]);

    return (
        <section>

            {/* Sort Control */}
            <div className="mb-6 flex flex-col justify-end gap-4 sm:flex-row sm:items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                    <label
                        htmlFor="sort"
                        className="whitespace-nowrap text-sm font-medium text-gray-600"
                    >
                        সাজান:
                    </label>

                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-bordered w-full max-w-56 bg-white text-sm"
                    >
                        <option value="default">
                            ডিফল্ট
                        </option>

                        <option value="low-to-high">
                            দাম: কম থেকে বেশি
                        </option>

                        <option value="high-to-low">
                            দাম: বেশি থেকে কম
                        </option>
                    </select>

                </div>
            </div>

            {/* Product Cards */}
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>
            ) : (
                <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">

                    <p className="text-4xl">🛒</p>

                    <h3 className="mt-4 text-lg font-bold text-gray-800">
                        কোনো পণ্য পাওয়া যায়নি
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
                    </p>

                </div>
            )}

        </section>
    );
};

export default CategoryProducts;
