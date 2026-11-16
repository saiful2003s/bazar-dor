
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
    Pencil,
    LogOut,
    UserRound
} from "lucide-react";

const ProfilePage = () => {

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Redirect if user is not logged in
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/sign-in");
        }
    }, [isPending, session, router]);

    // Load current user information
    useEffect(() => {
        if (session) {
            setName(session.user.name || "");
        }
    }, [session]);

    // Handle Sign Out
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

    // Handle Profile Update
    const handleUpdateProfile = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("আপনার নাম লিখুন!");
            return;
        }

        try {
            setIsUpdating(true);

            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "Profile update failed!");
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

            router.refresh();

        } catch {
            toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে!");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending || !session) {
        return (
            <div className="min-h-[70vh] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
            </div>
        );
    }

    const user = session.user;

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Profile Card */}
                <div className="">

                    {/* Header */}
                    <div className="px-6 py-8">
                        <h1 className="text-2xl font-bold">
                            আমার প্রোফাইল
                        </h1>
                        <p className="text-sm mt-1">
                            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                        </p>
                    </div>

                    <div className="p-6 sm:p-8">

                        {/* User Avatar */}
                        <div className="flex justify-between flex-col sm:flex-row items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex flex-col sm:flex-row items-center gap-5">

                                <div className="w-24 h-24 rounded-2xl bg-green-100 border-4 border-green-50 overflow-hidden flex items-center justify-center">

                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User"}
                                            width={96}
                                            height={96}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-4xl font-bold text-green-600">
                                            {user.name?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    )}

                                </div>

                                <div className="text-center sm:text-left">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {user.name}
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        {user.email}
                                    </p>
                                </div>

                            </div>

                            {/* Sign Out */}
                            <div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-3 text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    <span>সাইন আউট</span>
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Update Profile Form */}
            <div className="max-w-2xl mx-auto mt-8">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-7">
                        <h1 className="text-2xl font-bold">
                            তথ্য
                        </h1>
                    </div>

                    <form
                        onSubmit={handleUpdateProfile}
                        className="p-6 sm:p-8 space-y-6"
                    >

                        {/* Name Field */}
                        <div>
                            <label className="label mb-1">
                                <span className="label-text font-semibold text-gray-700">
                                    নাম
                                </span>
                            </label>

                            <div className="relative">
                                <UserRound
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full pl-10 focus:outline-green-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-3">

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="btn bg-green-600 hover:bg-green-700 text-white border-none flex-1 py-3"
                            >
                                {isUpdating ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        আপডেট হচ্ছে...
                                    </>
                                ) : (
                                    <>
                                        আপডেট
                                    </>
                                )}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
