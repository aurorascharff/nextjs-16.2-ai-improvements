import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACME Store",
  description: "Next.js 16.2 AI Improvements Demo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cartCount = parseInt(
    cookieStore.get("cart-count")?.value ?? "0",
    10
  );

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border">
          <div className="max-w-5xl mx-auto px-6 flex items-center h-14 gap-4">
            <Link href="/" className="font-semibold text-sm tracking-tight">
              ACME
            </Link>
            <nav className="ml-4 flex items-center gap-5 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Shop
              </Link>
            </nav>
            <div className="ml-auto">
              <Link
                href="/"
                className="relative flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

        {children}

        <footer className="border-t border-border mt-auto">
          <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-muted-foreground">
            <span>&copy; 2026 ACME Inc.</span>
            <div className="flex gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>FAQ</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
