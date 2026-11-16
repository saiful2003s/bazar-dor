const ProductSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-xl border bg-white p-5 shadow-sm"
                >
                    <div className="h-6 w-1/2 rounded bg-gray-200" />

                    <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />

                    <div className="mt-5 h-10 w-1/3 rounded bg-gray-200" />

                    <div className="mt-5 h-10 w-full rounded bg-gray-200" />
                </div>
            ))}

        </div>
    );
};

export default ProductSkeleton;