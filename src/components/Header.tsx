
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import LiveDate from "./LiveDate";
import { UserRound, LogOut, ChevronDown } from "lucide-react";

const HeaderPage = () => {
    const router = useRouter();

    // Get logged-in user session
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "Logout failed!");
                return;
            }

            toast.success("Logged out successfully!");

            router.replace("/sign-in");
            router.refresh();

        } catch {
            toast.error("Logout করতে সমস্যা হয়েছে!");
        }
    };

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

                    {isPending ? (
                        <div className="flex items-center gap-2">
                            <div className="skeleton h-9 w-16 rounded-lg" />
                            <div className="skeleton h-9 w-20 rounded-lg" />
                        </div>
                    ) : session ? (

                        /* Logged In User */
                        <div className="dropdown dropdown-end">

                            <button
                                tabIndex={0}
                                className="btn btn-ghost flex items-center gap-2"
                            >
                                {/* User Avatar */}
                                <div className="avatar placeholder">
                                    <div className="bg-green-600 text-white rounded-2xl w-9 overflow-hidden">
                                        {session.user.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name || "User"}
                                                width={36}
                                                height={36}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold">
                                                {session.user.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || "U"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <span className="hidden sm:block font-semibold text-gray-700">
                                    {session.user.name}
                                </span>

                                <ChevronDown size={16} />
                            </button>

                            {/* Dropdown Menu */}
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-white rounded-xl z-50 mt-3 w-60 p-2 shadow-lg border border-gray-100"
                            >

                                <li>
                                    <span className="font-bold text-gray-800">
                                        {session.user.name}
                                    </span>
                                </li>

                                <li className="menu-title">
                                    <span className="text-gray-400 text-xs">
                                        {session.user.email}
                                    </span>
                                </li>

                                <div className="divider my-1" />

                                {/* My Profile */}
                                <li>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3"
                                    >
                                        <UserRound size={18} />
                                        <span>আমার প্রোফাইল</span>
                                    </Link>
                                </li>

                                {/* Sign Out */}
                                <li>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-3 text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={18} />
                                        <span>সাইন আউট</span>
                                    </button>
                                </li>

                            </ul>

                        </div>

                    ) : (

                        /* Logged Out User */
                        <>
                            <Link
                                href="/sign-in"
                                className="text-gray-700 hover:text-green-600 transition-colors font-semibold text-sm sm:text-base px-2 sm:px-3 py-2"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/sign-up"
                                className="bg-green-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-green-700 transition-all font-semibold text-sm sm:text-base shadow-sm hover:shadow-md"
                            >
                                সাইন আপ
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </header>
    );
};

export default HeaderPage;
