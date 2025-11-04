"use client";
import Image from "next/image";
import { PhoneCall } from "lucide-react";

export default function Header() {
  return (
    <header>
      {/* Top announcement bar */}
      <div className="bg-purple-300 text-center text-white py-2 text-sm font-medium">
        We are open. Thank You!
      </div>

      {/* Logo and request button */}
      <div className="flex justify-between items-center p-4 md:px-10">
        <div className="flex items-center space-x-2">
          <Image
            src="/dayta-logo.png"
            alt="Dayta Logo"
            width={35}
            height={35}
          />
          <h1 className="font-semibold text-lg">Dayta</h1>
        </div>

        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium text-sm">
          <PhoneCall size={16} className="mr-2" />
          Request Callback
        </button>
      </div>
    </header>
  );
}
