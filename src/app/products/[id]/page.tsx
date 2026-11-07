
import { IProductDetails } from "@/types/type";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ProductDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const formatNumber = (value: number) =>
    new Intl.NumberFormat("bn-BD", {
        maximumFractionDigits: 1,
    }).format(value);


const ProductDetailsPage = async ({
    params,
}: ProductDetailsPageProps) => {

    const { id } = await params;

    // Fetch Product Details
    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${id}`
    );

    if (!res.ok) {
        throw new Error("Product details fetch failed");
    }

    const result = await res.json();

    const product: IProductDetails = result.data ?? result;

    if (!product || !product.markets) {
        notFound();
    }

    // Price Calculation
    const markets = product.markets;

    const minPrice = Math.min(
        ...markets.map((market) => market.min)
    );

    const maxPrice = Math.max(
        ...markets.map((market) => market.max)
    );

    const avgPrice =
        markets.reduce(
            (total, market) =>
                total + (market.min + market.max) / 2,
            0
        ) / markets.length;

    const priceDifference = Math.abs(product.today - product.yesterday);

    // Sort Markets by Average Price (Low to High)
    const sortedMarkets = [...markets].sort((a, b) => {
        const avgA = (a.min + a.max) / 2;
        const avgB = (b.min + b.max) / 2;

        return avgA - avgB;
    });

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm max-w-6xl mx-auto px-4 py-3 text-gray-600">

                <Link
                    href="/"
                    className="text-gray-500 transition hover:text-green-600"
                >
                    হোম
                </Link>

                <span className="text-gray-400"> &gt; </span>

                <Link
                    href={`/category/${product.categoryNameBn}`}
                    className="text-gray-500 transition hover:text-green-600"
                >
                    {product.categoryNameBn}
                </Link>

                <span className="text-gray-400"> &gt; </span>

                <span className="font-semibold text-gray-800">
                    {product.nameBn}
                </span>

            </div>


            <div className="mx-auto max-w-6xl px-4 py-10">

                {/* Product Summary */}
                <section className="rounded-2xl border bg-white p-6 shadow-sm flex justify-between items-center gap-5 md:gap-10 mb-3">

                    <div className="flex items-center gap-5">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-5xl">
                            {product.image}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                প্রতি {product.unit} {product.categoryNameBn}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">

                                {product.change.dir === "up" ? (
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                                        {`গতকালের তুলনায় আজ দাম বেড়েছে ${formatNumber(priceDifference)} টাকা`}
                                    </span>
                                ) : product.change.dir === "down" ? (
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
                                        {`গতকালের তুলনায় আজ দাম কমেছে ${formatNumber(priceDifference)} টাকা`}
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                                        গতকালের তুলনায় আজ দাম অপরিবর্তিত
                                    </span>
                                )
                                }


                            </div>
                        </div>

                    </div>

                    {/* right side */}
                    <div className="text-center p-3 rounded-2xl bg-base-200 shadow-sm">

                        <p className="text-sm text-gray-500">
                            আজকের দাম
                        </p>

                        <span className="block font-bold text-4xl">
                            {formatNumber(product.today)}
                        </span>

                        <p>টাকা / {product.unit}</p>

                        <span
                            className={`flex justify-center items-center gap-1 text-sm font-bold ${product.change.pct > 0
                                ? "text-green-600"
                                : product.change.pct < 0
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                        >
                            {product.change.pct > 0
                                ? "▲"
                                : product.change.pct < 0
                                    ? "▼"
                                    : "—"}

                            {formatNumber(Math.abs(product.change.pct))}%
                        </span>

                    </div>
                </section>

                <div className="bg-white p-6 mt-10 rounded-2xl shadow-sm">
                    {/* Price Summary */}
                    <section className="">

                        <h2 className="mb-5 text-2xl font-bold text-gray-900">
                            দামের সারসংক্ষেপ
                        </h2>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                            <div className="rounded-2xl bg-white p-6 shadow-sm border">
                                <p className="text-sm">
                                    সর্বনিম্ন দাম
                                </p>

                                <h3 className="my-3 text-2xl font-bold text-green-600">
                                    {formatNumber(minPrice)} টাকা
                                </h3>

                                <p className="text-sm ">
                                    সবচেয়ে কম দামের বাজার
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-sm border">
                                <p className="text-sm">
                                    সর্বোচ্চ দাম
                                </p>

                                <h3 className="my-3 text-2xl font-bold text-red-500">
                                    {formatNumber(maxPrice)} টাকা
                                </h3>

                                <p className="text-sm">
                                    সবচেয়ে বেশি দামের বাজার
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-sm border">
                                <p className="text-sm">
                                    গড় দাম
                                </p>

                                <h3 className="my-3 text-2xl font-bold text-green-600">
                                    {formatNumber(avgPrice)} টাকা
                                </h3>

                                <p className="text-sm">
                                    প্রতি {product.unit}-এর হিসাবে
                                </p>
                            </div>

                        </div>
                    </section>


                    {/* Market Wise Price */}
                    <section className="mt-10">

                        <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[650px] text-sm">

                                    {/* Table Header */}
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-5 py-4 text-left font-semibold">
                                                বাজার
                                            </th>

                                            <th className="px-5 py-4 text-left font-semibold">
                                                বিভাগ
                                            </th>

                                            <th className="px-5 py-4 text-right font-semibold">
                                                সর্বনিম্ন
                                            </th>

                                            <th className="px-5 py-4 text-right font-semibold">
                                                সর্বোচ্চ
                                            </th>

                                            <th className="px-5 py-4 text-right font-semibold">
                                                গড়
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y divide-gray-200">

                                        {sortedMarkets.map((market, index) => {

                                            const averagePrice =
                                                (market.min + market.max) / 2;

                                            return (
                                                <tr
                                                    key={`${market.market}-${index}`}
                                                    className="transition hover:bg-green-50"
                                                >

                                                    {/* Market Name */}
                                                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-800">
                                                        {market.market}
                                                    </td>

                                                    {/* Division */}
                                                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                                                        {market.division}
                                                    </td>

                                                    {/* Minimum Price */}
                                                    <td className="whitespace-nowrap px-5 py-4 text-right text-gray-700">
                                                        {formatNumber(market.min)} টাকা
                                                    </td>

                                                    {/* Maximum Price */}
                                                    <td className="whitespace-nowrap px-5 py-4 text-right text-gray-700">
                                                        {formatNumber(market.max)} টাকা
                                                    </td>

                                                    {/* Average Price */}
                                                    <td className="whitespace-nowrap px-5 py-4 text-right font-bold text-gray-900">
                                                        {formatNumber(averagePrice)} টাকা
                                                    </td>

                                                </tr>
                                            );
                                        })}

                                    </tbody>

                                </table>

                            </div>
                        </div>

                    </section>
                </div>


            </div>
        </main>
    );
};

export default ProductDetailsPage;
