
const CategoryLoading = () => {
    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-6xl px-4 py-10">

                {/* Category Header Skeleton */}
                <div className="mb-8 flex items-center gap-4 rounded-2xl border bg-white p-6">

                    <div className="skeleton h-16 w-16 shrink-0 rounded-2xl" />

                    <div className="flex-1 space-y-3">
                        <div className="skeleton h-7 w-40" />
                        <div className="skeleton h-4 w-64 max-w-full" />
                    </div>

                </div>

                {/* Sort Skeleton */}
                <div className="mb-6 flex justify-between">
                    <div className="skeleton h-5 w-32" />
                    <div className="skeleton h-10 w-52 rounded-lg" />
                </div>

                {/* Product Card Skeleton */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border bg-white p-5 shadow-sm"
                        >

                            <div className="flex items-center gap-3">

                                <div className="skeleton h-14 w-14 rounded-xl" />

                                <div className="flex-1 space-y-2">
                                    <div className="skeleton h-5 w-28" />
                                    <div className="skeleton h-4 w-20" />
                                </div>

                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="skeleton h-4 w-24" />
                                <div className="skeleton h-7 w-32" />
                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </main>
    );
};

export default CategoryLoading;
