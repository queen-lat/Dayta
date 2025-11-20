"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#fafafa] dark:bg-gray-950">
      <div
        className="w-[90%] h-[90%] bg-white
       dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden flex"
      >
        {/* LEFT PURPLE SECTION */}
        <div className="w-[35%] h-full relative items-center hidden md:block bg-[#CCA8D2]">
          <div className="absolute right-[-120px]  ">
            <Image
              src="/illustration.svg"
              width={480}
              height={480}
              alt="Illustration"
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT WHITE SECTION */}
        <div className="w-full md:w-[65%] h-full  px-3 md:px-20 py-3 md:py-12 flex flex-col justify-between items-center ">
          <div className="w-full max-w-[380px]">
            {/* Dayta Logo */}
            <div className="flex items-center gap-3 mb-10 justify-center">
              <Image
                src="/dayta-logo.png"
                width={45}
                height={45}
                alt="Dayta Logo"
              />
              <h1 className="text-3xl font-semibold text-black  dark:text-white">
                Dayta
              </h1>
            </div>

            {/* Heading */}
            <h2 className="text-2xl  mb-8 font-serif">Login to your Account</h2>

            {/* EMAIL INPUT */}
            {/* <div className="mb-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-400 rounded-xl px-4 py-3 bg-transparent outline-none"
              />
            </div> */}

            {/* PASSWORD INPUT
            <div className="mb-5">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-400 rounded-xl px-4 py-3 bg-transparent outline-none"
              />
              <span className="text-right text-sm text-gray-600 mt-2 block cursor-pointer">
                Forgot password?
              </span>
            </div> */}

            {/* LOGIN BUTTON */}
            {/* <button
              className="w-full py-3 rounded-full text-white font-medium mb-5"
              style={{ backgroundColor: "#61126F" }}
            >
              Log in
            </button> */}

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-4">
              <span className="flex-1 h-[1px] bg-gray-300"></span>
              <span className="text-gray-600 text-sm">OR</span>
              <span className="flex-1 h-[1px] bg-gray-300"></span>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 bg-white mb-4 "
              onClick={() => {
                signIn("google", {
                  callbackUrl: `${window.location.origin}/dashboard`,
                });
              }}
            >
              <Image
                src="/google.svg"
                width={22}
                height={22}
                alt="Google Logo"
              />
              <span className="text-white dark:text-black">
                Continue with Google
              </span>
            </button>

            {/* FACEBOOK BUTTON */}
            <button className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 bg-white">
              <Image
                src="/facebook.svg"
                width={22}
                height={22}
                alt="Facebook Logo"
              />
              <span className="text-white dark:text-black">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
