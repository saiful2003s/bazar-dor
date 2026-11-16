import Link from "next/link";

const NotFound = () => {
    return (
        <main className="min-h-100 flex flex-col justify-center items-center bg-gray-50 px-4 text-center">

            <h1 className="text-8xl font-bold text-green-600">
                404
            </h1>

            <h2 className="mt-5 text-2xl font-bold text-gray-800">
                পেজটি খুঁজে পাওয়া যায়নি!
            </h2>

            <p className="mt-3 text-gray-500">
                দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
            </p>

            <Link
                href="/"
                className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
                হোম পেজে ফিরে যান
            </Link>

        </main>
    );
};

export default NotFound;