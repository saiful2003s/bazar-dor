import Image from "next/image";
import Link from "next/link";
import LiveDate from "./LiveDate";


const Hero = () => {


    return (
        <section className="max-w-6xl mx-auto px-4 py-5 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 rounded-3xl bg-white p-2 md:p-4">

                {/* Left Content */}
                <div className="space-y-5 md:col-span-2 ">

                    {/* Eyebrow */}
                    <p className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        <LiveDate />
                    </p>

                    {/* Main Heading */}
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* CTA Button */}
                    <Link
                        href="#all-products"
                        className="inline-block rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        সব পণ্য দেখুন →
                    </Link>
                </div>

                {/* Right Image */}
                <div className="relative flex justify-center md:col-span-1">
                    <Image
                        src="/bazar-hero.png"
                        alt="Fresh vegetables and grocery products"
                        width={600}
                        height={450}
                        priority
                        className="h-auto w-full max-w-md rounded-2xl object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;