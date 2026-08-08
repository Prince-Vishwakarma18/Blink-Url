import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import SigninForm from "./Signin";
import SignupForm from "./Signup";

function AuthDrawer({ authOpen, setAuthOpen }) {
    const [mode, setMode] = useState("signin");

    if (!authOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">

            {/* Close Btn*/}
            <button
                type="button"
                onClick={() => setAuthOpen(false)}
                className="absolute right-3 top-3 sm:right-5 sm:top-5 cursor-pointer"
            >
                <RxCross2
                    className="text-gray-400 hover:text-white transition"
                    size={28}
                />
            </button>

            {/* Signin && Signup*/}
            <div className="w-full max-w-md max-h-[95vh] rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0F172A] p-4 sm:p-6 md:p-7">

                {mode === "signin" ? (
                    <SigninForm
                        setMode={setMode}
                        setAuthOpen={setAuthOpen}
                    />
                ) : (
                    <SignupForm
                        setMode={setMode}
                    />
                )}

            </div>
        </div>
    );
}

export default AuthDrawer;