"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#fafafa] dark:bg-gray-950">
      <div
        className="w-[90%] h-[90%] bg-white dark:bg-gray-900 
        rounded-3xl shadow-xl overflow-hidden flex relative"
      >
        {/* DECORATIVE BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Soft blurred circle */}
          <div
            className="absolute top-10 left-10 w-40 h-40 bg-purple-300 
          opacity-40 blur-3xl rounded-full"
          ></div>

          {/* Cyan glow */}
          <div
            className="absolute bottom-10 right-20 w-32 h-32 
          bg-blue-300 opacity-30 blur-2xl rounded-full"
          ></div>
        </div>

        {/* LEFT PURPLE SECTION */}
        <div className="w-[35%] h-full relative hidden md:block bg-[#CCA8D2]">
          {/* PARTICLE EFFECTS */}
          <div className="absolute inset-0 overflow-hidden">
            {/* particle dots */}
            <div className="absolute w-2 h-2 bg-white rounded-full opacity-40 top-10 left-16 blur-[2px]"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full opacity-30 top-32 left-40 blur-[1px]"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full opacity-50 top-64 left-24 blur-[2px]"></div>
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-40 top-80 left-10 blur-[2px]"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full opacity-40 top-52 left-56 blur-[2px]"></div>
          </div>

          {/* Illustration */}
          <div className="absolute right-[-120px] top-1/2 -translate-y-1/2">
            <Image
              src="/illustration.svg"
              width={480}
              height={480}
              alt="Illustration"
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT LOGIN SECTION */}
        <div
          className="w-full md:w-[65%] h-full px-3 md:px-20 py-3 md:py-12 
        flex flex-col justify-center items-center relative z-10"
        >
          <div className="w-full max-w-[380px] text-center">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 justify-center">
              <Image
                src="/dayta-logo.png"
                width={45}
                height={45}
                alt="Dayta Logo"
              />
              <h1 className="text-3xl font-semibold text-black dark:text-white">
                Dayta
              </h1>
            </div>

            {/* Heading */}
            <h2 className="text-2xl mb-10 font-serif text-black dark:text-white">
              Login to your Account
            </h2>

            {/* GOOGLE BUTTON */}
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: `${window.location.origin}/dashboard`,
                })
              }
              className="w-full border border-gray-300 py-3 rounded-xl 
              flex items-center justify-center gap-3 bg-white dark:bg-gray-800 
              shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] 
              transition-all mb-4"
            >
              <Image src="/google.svg" width={22} height={22} alt="Google" />
              <span className="text-black dark:text-white">
                Continue with Google
              </span>
            </button>

            {/* FACEBOOK BUTTON */}
            <button
              onClick={() =>
                signIn("facebook", {
                  callbackUrl: `${window.location.origin}/dashboard`,
                })
              }
              className="w-full border border-gray-300 py-3 rounded-xl 
              flex items-center justify-center gap-3 bg-white dark:bg-gray-800 
              shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] 
              transition-all"
            >
              <Image
                src="/facebook.svg"
                width={22}
                height={22}
                alt="Facebook"
              />
              <span className="text-black dark:text-white">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
