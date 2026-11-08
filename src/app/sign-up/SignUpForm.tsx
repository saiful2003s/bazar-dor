
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignUpForm = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const handleSignUp = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            toast.error("সবগুলো তথ্য পূরণ করুন");
            return;
        }

        if (password.length < 8) {
            toast.error("Password কমপক্ষে ৮ অক্ষরের হতে হবে");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("দুটি পাসওয়ার্ড মিলছে না!");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
            });

            if (error) {
                toast.error(error.message || "Registration failed");
                return;
            }

            toast.success("Registration successful!");

            router.push("/signin");
            router.refresh();

        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (
        provider: "google" | "github"
    ) => {
        setSocialLoading(provider);

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Social login failed");
                setSocialLoading("");
            }
        } catch {
            toast.error("Social login failed");
            setSocialLoading("");
        }
    };

    return (
            <div className="w-full max-w-md">

                <div className="mb-7 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <form
                    onSubmit={handleSignUp}
                    className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8"
                >

                    {/* Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            নাম
                        </label>

                        <input
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full bg-white"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            ইমেইল
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full bg-white"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            পাসওয়ার্ড
                        </label>

                        <input
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full bg-white"
                            minLength={8}
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            type="password"
                            placeholder="আবার পাসওয়ার্ড লিখুন"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input input-bordered w-full bg-white"
                            minLength={8}
                            required
                        />

                        {confirmPassword && (
                            <p className={`mt-1 text-xs ${
                                password === confirmPassword
                                    ? "text-green-600"
                                    : "text-red-500"
                            }`}>
                                {password === confirmPassword
                                    ? "✓ পাসওয়ার্ড মিলেছে"
                                    : "✕ পাসওয়ার্ড মিলছে না"}
                            </p>
                        )}
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        disabled={loading || !!socialLoading}
                        className="btn w-full border-none bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            "অ্যাকাউন্ট তৈরি করুন"
                        )}
                    </button>

                    {/* Divider */}
                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {/* Google */}
                        <button
                            type="button"
                            disabled={loading || !!socialLoading}
                            onClick={() => handleSocialLogin("google")}
                            className="btn h-12 border border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                        >
                            {socialLoading === "google" ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <>
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 48 48"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.97 46.98 31.8 46.98 24.55z" />
                                        <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19z" />
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                    </svg>

                                    <span>Google</span>
                                </>
                            )}
                        </button>

                        {/* GitHub */}
                        <button
                            type="button"
                            disabled={loading || !!socialLoading}
                            onClick={() => handleSocialLogin("github")}
                            className="btn h-12 border border-gray-900 bg-gray-900 text-white shadow-sm hover:border-black hover:bg-black hover:shadow-md transition-all duration-200"
                        >
                            {socialLoading === "github" ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <>
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.87 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                                    </svg>

                                    <span>GitHub</span>
                                </>
                            )}
                        </button>

                    </div>

                    {/* Sign In Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="font-semibold text-green-600 hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>

                </form>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors duration-200"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>

            </div>
       
    );
};

export default SignUpForm;
