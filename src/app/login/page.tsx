"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    router.push("/dashboard"); // redirect to dashboard
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-r from-purple-100 to-white items-center justify-center">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left side illustration */}
        <div className="hidden md:flex w-1/2 bg-purple-100 items-center justify-center p-8">
          <Image
            src="/illustration.svg"
            alt="Login Illustration"
            width={500}
            height={500}
            className="object-contain"
            priority
          />
        </div>

        {/* Right side login form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <Image
              src="/dayta-logo.png"
              alt="Dayta logo"
              width={45}
              height={45}
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Dayta
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Login to your Account
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a
                href="#"
                className="absolute right-3 top-3 text-sm text-gray-500 hover:text-purple-600"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-full font-medium hover:bg-purple-800 transition"
            >
              Log in
            </button>
          </form>

          {/* OR separator */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition"
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium text-gray-700">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
