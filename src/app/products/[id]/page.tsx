interface ProductDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

const ProductDetailsPage = async ({
    params,
}: ProductDetailsProps) => {
    const { id } = await params;

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-2xl font-bold">
                Product Details
            </h1>

            <p className="mt-3 text-gray-600">
                Product ID: {id}
            </p>
        </div>
    );
};

export default ProductDetailsPage;