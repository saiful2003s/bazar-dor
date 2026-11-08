
import { ICategory, IProduct } from "@/types/type";
import CategoryProducts from "@/components/products/CategoryProducts";
import Link from "next/link";

interface CategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

const API_URL =
    "https://openapi.programming-hero.com/api/bazardor";

const CategoryPage = async ({
    params,
}: CategoryPageProps) => {

    const { id } = await params;

    // Fetch Categories
    const categoryRes = await fetch(
        `${API_URL}/categories`,
        { cache: "no-store" }
    );

    if (!categoryRes.ok) {
        throw new Error("Categories fetch failed");
    }

    const categoryJson = await categoryRes.json();

    const categories: ICategory[] = Array.isArray(categoryJson)
        ? categoryJson
        : categoryJson.data ?? [];

    // Find Category By Slug
    const category = categories.find(
        (item) => item.slug === id
    );

    // Invalid Category
    if (!category) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center">

                    <span className="text-6xl">🔍</span>

                    <h1 className="mt-5 text-2xl font-bold text-gray-800">
                        ক্যাটাগরি পাওয়া যায়নি!
                    </h1>

                    <p className="mt-2 text-gray-500">
                        আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
                    </p>

                    <Link
                        href="/"
                        className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        হোম পেজে ফিরে যান
                    </Link>

                </div>
            </main>
        );
    }

    // Fetch Category Products
    const productsRes = await fetch(
        `${API_URL}/products?category=${id}`,
        { cache: "no-store" }
    );

    if (!productsRes.ok) {
        throw new Error("Category products fetch failed");
    }

    const productsJson = await productsRes.json();

    const products: IProduct[] = Array.isArray(productsJson)
        ? productsJson
        : productsJson.data ?? [];

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-6xl px-4 py-10">

                {/* Category Header */}
                <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
                            {category.icon}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                {category.nameBn}
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                {products.length} টি পণ্যের আজকের দাম ও পরিবর্তন
                            </p>
                        </div>

                    </div>

                </section>

                {/* Products */}
                {products.length > 0 ? (
                    <CategoryProducts products={products} />
                ) : (
                    <div className="rounded-2xl border bg-white py-16 text-center">

                        <p className="text-5xl">🛒</p>

                        <h2 className="mt-4 text-xl font-bold text-gray-800">
                            এই ক্যাটাগরিতে কোনো পণ্য নেই
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            বর্তমানে এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                        >
                            হোম পেজে ফিরে যান
                        </Link>

                    </div>
                )}

            </div>

        </main>
    );
};

export default CategoryPage;
