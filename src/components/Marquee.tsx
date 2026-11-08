
import { IProduct } from "@/types/type";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const PriceTicker = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    const products: IProduct[] = await res.json();

    const formatNumber = (value: number) =>
        new Intl.NumberFormat("bn-BD", {
            maximumFractionDigits: 1,
        }).format(value);

    return (
        <div className="bg-base-50 border-y border-green-100">
            <MarqueeText
                duration={15}
                pauseOnHover={true}
                direction="right"
            >
                {[...products, ...products].map((product, index) => (
                    <Link key={`${product.id}-${index}`} href={`/products/${product.id}`}>
                        <div
                            className="flex items-center gap-3 px-6 py-3 whitespace-nowrap border-r border-green-200"
                        >

                            {/* Product Icon */}
                            <span className="text-xl">
                                {product.image}
                            </span>

                            {/* Product Name */}
                            <span className="font-semibold text-gray-800">
                                {product.nameBn}
                            </span>

                            {/* Product Price */}
                            <span className="text-sm">
                                <span className="">
                                    {formatNumber(product.today)} টাকা
                                </span>

                                <span className="ml-1">
                                    / {product.unit}
                                </span>
                            </span>

                            {/* Price Change */}
                            <span
                                className={`flex items-center gap-1 text-sm font-bold ${product.change.pct > 0
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
                    </Link>
                ))}
            </MarqueeText>
        </div>
    );
};

export default PriceTicker;
