"use client";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white rounded-3xl overflow-hidden">
      {/* Left Section - Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 items-center justify-center">
        <Image
          src="/illustration.svg"
          alt="Login Illustration"
          width={500}
          height={500}
          className="w-3/4 max-w-[450px]"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-10">
        {/* Logo */}
        <div className="flex justify-center md:justify-start items-center mb-8">
          <Image
            src="/dayta-logo.png"
            alt="Dayta Logo"
            width={120}
            height={40}
            className="mr-2"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Login to your Account
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="text-right text-sm text-gray-600 cursor-pointer hover:text-purple-600">
            Forgot password?
          </div>

          <button
            type="submit"
            className="bg-purple-800 text-white w-full py-3 rounded-full hover:bg-purple-900 transition"
          >
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="flex items-center justify-center border border-gray-400 w-full py-3 rounded-md hover:bg-gray-50 transition"
          >
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </button>

          {/* Facebook Login */}
          <button
            type="button"
            className="flex items-center justify-center border border-gray-400 w-full py-3 rounded-md hover:bg-gray-50 transition"
          >
            <Image
              src="/facebook.svg"
              alt="Facebook logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Facebook
          </button>
        </form>
      </div>
    </div>
  );
}
