import React, { useState } from "react";
import axiosInstance from "../../Service/api";
import toast from "react-hot-toast";

function Signup({ setMode }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.dismiss();
            return toast.error("Please fill all fields");
        }

        if (formData.password !== formData.confirmPassword) {
            toast.dismiss();
            return toast.error("Passwords do not match");
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post("/users/signup", formData);

            if (res.data.success) {
                toast.dismiss();
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-white">
                Create Account
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-center text-slate-400 mt-2">
                Join BlinkUrl and start shortening links
            </p>

            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mt-3">
                    <label className="text-xs sm:text-sm text-slate-300">
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        placeholder="Enter your full name"
                        className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none focus:border-blue-600 transition"
                    />
                </div>

                {/* Email */}
                <div className="mt-3">
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
                        className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none focus:border-blue-600 transition"
                    />
                </div>

                {/* Password */}
                <div className="mt-3">
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
                        placeholder="Password"
                        className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none focus:border-blue-600 transition"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mt-3">
                    <label className="text-xs sm:text-sm text-slate-300">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                        placeholder="Confirm Password"
                        className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none focus:border-blue-600 transition"
                    />
                </div>

                {/* Btn */}
                <button
                    disabled={loading}
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold transition"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>

            {/* Divider */}
            <div className="my-4 sm:my-5 flex items-center">
                <div className="flex-1 h-px bg-slate-700"></div>

                <span className="mx-2 text-slate-500 text-xs sm:text-sm">
                    OR
                </span>

                <div className="flex-1 h-px bg-slate-700"></div>
            </div>

            {/* Sign In */}
            <p className="text-center text-xs sm:text-sm md:text-base text-slate-400">
                Already have an account?

                <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="ml-1.5 sm:ml-2 text-blue-400 hover:text-blue-300 font-semibold"
                >
                    Sign In
                </button>
            </p>
        </>
    );
}

export default Signup;