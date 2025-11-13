import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DataCardProps {
  Image?: string;
  Name: string;
  Link: string;
  available?: boolean;
}

const DataCard = (Props: DataCardProps) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-500 shadow-md ${
        Props.available !== false
          ? "hover:shadow-2xl hover:shadow-fuchsia-500/10 hover:-translate-y-1"
          : "opacity-60"
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
        <Image
          src={Props.Image || "/mtnl.jpg"}
          width={400}
          height={300}
          alt={Props.Name}
          className={`object-cover w-full h-full transition-transform duration-700 ${
            Props.available !== false ? "group-hover:scale-105" : "grayscale"
          }`}
        />
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-500 ${
            Props.available !== false
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-0"
          }`}
        />

        {/* Coming Soon Badge */}
        {Props.available === false && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-neutral-900/90 dark:bg-white/90 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white dark:text-neutral-900">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4 tracking-tight">
          {Props.Name}
        </h3>

        {Props.available !== false ? (
          <Link
            href={Props.Link || "/"}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/50 active:scale-95"
          >
            Browse Packages
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-medium text-sm cursor-not-allowed pointer-events-none"
          >
            Coming Soon
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default DataCard;
