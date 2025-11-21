"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X, LogIn, LogOut, User, ChevronDown } from "lucide-react";

const NavBa = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // // Redirect on unauthenticated states (client only)
  // useEffect(() => {
  //   // Only redirect on the client and after session resolves
  //   if (status === "unauthenticated" && pathname?.startsWith?.("/dashboard")) {
  //     // replace so user can't press back to return to protected page
  //     router.replace("/login");
  //   }
  // }, [status, pathname, router]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Loading skeleton while session resolving
  if (status === "loading") {
    return (
      <nav className="fixed inset-x-4 top-4 z-50 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-neutral-900/60 border border-neutral-200/30 dark:border-neutral-800/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            <div className="w-28 h-4 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          </div>
          <div className="h-8 w-28 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        </div>
      </nav>
    );
  }

  const isAuthenticated = Boolean(session);

  return (
    <>
      <nav className="fixed inset-x-4 top-4 z-50 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-neutral-950/60 border border-neutral-200/30 dark:border-neutral-800/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center text-white shadow">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 12h16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 7h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 17h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm md:text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
                Dayta
              </span>
            </Link>
          </div>

          {/* Center nav - hidden on mobile */}
          <div className="hidden md:flex items-center gap-6"></div>

          {/* actions */}
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* sign in / user */}
            {!isAuthenticated ? (
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-fuchsia-600 hover:bg-fuchsia-700 active:scale-95 text-white rounded-lg text-sm shadow-sm transition"
              >
                <LogIn size={14} />
                Sign in
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMenuOpen((s) => !s)}
                  className="inline-flex items-center gap-3 px-3 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  aria-expanded={menuOpen}
                >
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image ?? "/icon.png"}
                    alt={session?.user?.name ?? "avatar"}
                    className="rounded-full object-cover"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white leading-none">
                      {session?.user?.name}
                    </span>
                    <span
                      className="text-xs text-neutral-500 dark:text-neutral-400 leading-none truncate"
                      style={{ maxWidth: 160 }}
                    >
                      {session?.user?.email}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`ml-1 transition-transform ${
                      menuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800 rounded-lg shadow-lg py-1 overflow-hidden">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <div className="inline-flex items-center gap-2">
                        <LogOut size={14} /> Sign out
                      </div>
                    </button>
                    <Link
                      href="/support"
                      className="w-full text-left block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      Support
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* mobile panel */}
      {mobileOpen && (
        <div className="fixed inset-x-4 top-[78px] z-40 rounded-xl backdrop-blur-sm bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/40 dark:border-neutral-800/40 shadow-md md:hidden">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/AT-retail"
              className="px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              AirtelTigo
            </Link>
            <Link
              href="/dashboard/mtn-retail"
              className="px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              MTN
            </Link>
            <Link
              href="/support"
              className="px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              Support
            </Link>

            <div className="border-t border-neutral-200/40 dark:border-neutral-800/40 mt-2 pt-2">
              {!isAuthenticated ? (
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className="w-full px-3 py-2 rounded-md bg-fuchsia-600 text-white flex items-center justify-center gap-2"
                >
                  <LogIn size={16} /> Sign In
                </button>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-3">
                    <Image
                      width={40}
                      height={40}
                      src={session?.user?.image ?? "/icon.png"}
                      alt={session?.user?.name ?? "avatar"}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">
                        {session?.user?.name}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {session?.user?.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-3 py-2 mt-2 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBa;
