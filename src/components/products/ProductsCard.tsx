import { IProduct } from "@/types/type";
import Link from "next/link";

interface ProductCardProps {
    product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {

    const formatNumber = (value: number) =>
        new Intl.NumberFormat("bn-BD", {
            maximumFractionDigits: 1,
        }).format(value);

    const percentage = product.change.pct;

    return (
        <Link
            href={`/products/${product.id}`}
            className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
        >
            {/* Product Icon & Name */}
            <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {product.image}
                </div>

                <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-gray-800 group-hover:text-green-600">
                        {product.nameBn}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        প্রতি {product.unit}
                    </p>
                </div>
            </div>

            {/* Price Information */}
            <div className="mt-5 border-gray-100 pt-4">

                <div className="">
                    <p className="text-sm text-gray-500">
                        আজকের দাম
                    </p>
                </div>

                {/* Price Change Badge */}
                <div className="mt-3 flex justify-between items-center gap-2">
                    <p className="text-lg font-bold text-gray-900">
                        {formatNumber(product.today)} টাকা
                    </p>

                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                            percentage > 0
                                ? "bg-green-50 text-green-600"
                                : percentage < 0
                                ? "bg-red-50 text-red-500"
                                : "bg-gray-100 text-gray-500"
                        }`}
                    >
                        {percentage > 0
                            ? "▲"
                            : percentage < 0
                            ? "▼"
                            : "—"}

                        {formatNumber(Math.abs(percentage))}%
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;