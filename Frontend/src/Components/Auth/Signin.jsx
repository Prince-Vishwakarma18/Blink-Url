import React, { useState } from "react";
import axiosInstance from "../../Service/api";
import toast from "react-hot-toast";

function Signin({ setMode }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return toast.error("Please fill all fields");
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post("/users/signin", formData);

            if (res.data.success) {
                toast.dismiss();
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-white">
                Welcome Back
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-center text-slate-400 mt-2 sm:mt-3">
                Login to your BlinkUrl account
            </p>

            <form onSubmit={handleFormSubmit}>
                {/* Email */}
                <div className="mt-5 sm:mt-8">
                    <label className="text-xs sm:text-sm text-slate-300">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        placeholder="Enter your email"
                        className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none focus:border-blue-600 transition"
                    />
                </div>

                {/* Password */}
                <div className="mt-4 sm:mt-5">
                    <label className="text-xs sm:text-sm text-slate-300">
                        Password
                    </label>

                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        placeholder="Enter your password"
                        className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none focus:border-pink-500 transition"
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 sm:mt-6 w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Divider */}
                <div className="my-5 sm:my-7 flex items-center">
                    <div className="flex-1 h-px bg-slate-700"></div>

                    <span className="mx-2 sm:mx-4 text-slate-500 text-xs sm:text-sm">
                        OR
                    </span>

                    <div className="flex-1 h-px bg-slate-700"></div>
                </div>

                {/* Sign Up */}
                <p className="text-center text-xs sm:text-sm md:text-base text-slate-400">
                    Don't have an account?

                    <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="ml-1.5 sm:ml-2 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </>
    );
}

export default Signin;