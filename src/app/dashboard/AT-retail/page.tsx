"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";

interface DataBundle {
  id: string;
  size: string; // backend expects this as 'volume'
  price: number;
  label: string; // e.g. '1GB'
}

const dataBundles: DataBundle[] = [
  { id: "1", size: "1000", price: 4, label: "1GB" },
  { id: "2", size: "2000", price: 8, label: "2GB" },
  { id: "3", size: "3000", price: 11, label: "3GB" },
  { id: "4", size: "5000", price: 18, label: "5GB" },
  { id: "5", size: "10000", price: 35, label: "10GB" },
  { id: "6", size: "20000", price: 65, label: "20GB" },
  { id: "7", size: "50000", price: 150, label: "50GB" },
];

export default function ATRetailPage() {
  const [selectedBundle, setSelectedBundle] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const { data: session } = useSession();

  const selectedBundleData = dataBundles.find((b) => b.id === selectedBundle);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      console.log("JWT sent to backend:", session?.user?.accessToken);
      const res = await axios.post(
        "http://localhost:8080/buy",
        {
          phone: phoneNumber,
          volume: selectedBundleData?.size,
          network: "at",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      // Handle success
      setModalType("success");
      setModalData(res.data);
      setShowModal(true);
    } catch (error: any) {
      // Handle error
      setModalType("error");
      setModalData(error.response?.data || error.message);
      setShowModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#222222]">
      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg shadow-orange-500/20">
              <Image
                src="/at.png"
                width={60}
                height={60}
                alt="AirtelTigo"
                className="rounded-2xl"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
              AirtelTigo Data
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Choose your bundle and complete your purchase
            </p>
          </div>

          {/* Purchase Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden">
            <form onSubmit={handlePurchase} className="p-8">
              {/* Bundle Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                  Select Data Bundle
                </label>
                <select
                  value={selectedBundle}
                  onChange={(e) => setSelectedBundle(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-neutral-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5rem",
                  }}
                >
                  <option value="" disabled>
                    Choose a bundle
                  </option>
                  {dataBundles.map((bundle) => (
                    <option key={bundle.id} value={bundle.id}>
                      {bundle.label} - GH₵{bundle.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., 0271234567"
                    pattern="[0-9]{10}"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-neutral-900 dark:text-white placeholder-neutral-400 font-medium focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  Enter 10-digit AirtelTigo number
                </p>
              </div>

              {/* Summary Card */}
              {selectedBundleData && (
                <div className="mb-6 p-6 bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/20 dark:to-pink-950/20 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Bundle
                    </span>
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">
                      {selectedBundleData.label} ({selectedBundleData.size}MB)
                    </span>
                  </div>
                  <div className="pt-3 border-t border-fuchsia-200 dark:border-fuchsia-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600">
                        GH₵{selectedBundleData.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              <button
                type="submit"
                disabled={isProcessing || !selectedBundle || !phoneNumber}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Purchase Bundle
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </form>

            {/* Info Footer */}
            <div className="px-8 py-6 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <p className="font-semibold mb-1">Important Notes:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Bundle activates instantly after payment</li>
                    <li>Recipient number must not owe airtime</li>
                    <li>Not valid for Turbonet SIM cards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Response Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden">
            {/* Header */}
            <div
              className={`px-6 py-4 ${
                modalType === "success"
                  ? "bg-green-50 dark:bg-green-950/20"
                  : "bg-red-50 dark:bg-red-950/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    modalType === "success"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {modalType === "success" ? (
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-red-600 dark:text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    modalType === "success"
                      ? "text-green-900 dark:text-green-100"
                      : "text-red-900 dark:text-red-100"
                  }`}
                >
                  {modalType === "success"
                    ? "Purchase Successful!"
                    : "Purchase Failed"}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 max-h-96 overflow-y-auto">
              <pre className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl overflow-x-auto">
                {JSON.stringify(modalData, null, 2)}
              </pre>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 px-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
