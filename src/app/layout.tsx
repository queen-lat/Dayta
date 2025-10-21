import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import AppShell from "@/components/Appshell";

// Metadata
export const metadata: Metadata = {
  title: {
    default: "Dayta – Fast and Seamless Connectivity",
    template: "%s · Dayta",
  },
  description:
    "Dayta provides fast and seamless connectivity solutions for all your data needs.",
  keywords: [
    "Dayta",
    "connectivity",
    "data",
    "mobile data",
    "internet",
    "telecommunications",
    "fast internet",
    "seamless connectivity",
  ],
  metadataBase: new URL("https://dayta.com"), // Update with your actual domain
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dayta.com", // Update with your actual domain
    title: "Dayta – Fast and Seamless Connectivity",
    description:
      "Dayta provides fast and seamless connectivity solutions for all your data needs.",
    siteName: "Dayta",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dayta – Fast and Seamless Connectivity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dayta – Fast and Seamless Connectivity",
    description:
      "Dayta provides fast and seamless connectivity solutions for all your data needs.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

// Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000", // Update with your primary brand color
};

// Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Performance & PWA */}
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="format-detection" content="telephone=no" />
        </head>

        <body
          className="antialiased bg-background text-foreground font-sans"
          style={{
            fontFamily:
              '"Helvetica Neue", Helvetica, Arial, "Segoe UI", system-ui, sans-serif',
          }}
        >
          <AppShell>{children}</AppShell>
        </body>
      </html>
    </ClerkProvider>
  );
}