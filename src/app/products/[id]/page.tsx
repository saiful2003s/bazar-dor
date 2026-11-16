
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import ProductDetailsPage from "./ProductDetailsPage";


interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    // Check user session
    const session = await getSession();

    // Redirect if user is not logged in
    if (!session) {
        redirect("/sign-in?reason=login-required");
    }

    // Get dynamic ID
    const { id } = await params;

    return <ProductDetailsPage id={id} />;
};

export default ProductPage;
