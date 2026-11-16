import ProductSkeleton from "@/components/shared/ProductSkeleton";

const Loading = () => {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200" />

            <ProductSkeleton />
        </main>
    );
};

export default Loading;