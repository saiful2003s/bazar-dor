"use client";

import Image from "next/image";
import Link from "next/link";
import LiveDate from "./LiveDate";


const HeaderPage = () => {

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo and Date */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-green-600 p-2.5 rounded-xl group-hover:bg-green-700 transition-colors shadow-sm">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor Logo"
              width={36}
              height={36}
              priority
            />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              বাজার <span className="text-green-600">দর</span>
            </h2>

            <p className="text-xs sm:text-sm mt-0.5">
              <LiveDate />
            </p>
          </div>
        </Link>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/signin"
            className="text-gray-700 hover:text-green-600 transition-colors font-semibold text-sm sm:text-base px-2 sm:px-3 py-2"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="bg-green-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-green-700 transition-all font-semibold text-sm sm:text-base shadow-sm hover:shadow-md"
          >
            সাইন আপ
          </Link>
        </div>

      </div>
    </header>
  );
};

export default HeaderPage;