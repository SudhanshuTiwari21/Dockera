import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { Shrink } from "lucide-react";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Compress Image Online – Reduce JPG, PNG, WebP Size",
    description:
      "Reduce image file size without losing quality. Compress JPG, PNG, and WebP in bulk with ease. Free, browser-based.",
    keywords: ["compress image", "reduce image size", "JPG compressor", "PNG compressor", "WebP compress"],
    path: "/tools/compress-image",
  }),
};

export default function CompressImagePage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools/image-resizer" className="hover:text-slate-900 dark:hover:text-slate-100">
              Image tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Compress Image</li>
        </ol>
      </nav>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <Shrink className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
          Compress Image
        </h1>
        <p className="mt-3 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Reduce image file size without losing quality. Compress JPG, PNG, and WebP in bulk with ease.
        </p>
        <div className="mt-8 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-8 py-12">
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">Coming soon</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            This tool is under development. Check back later or try our{" "}
            <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 dark:text-slate-100 underline underline-offset-2 hover:no-underline">
              Resize Image
            </Link>{" "}
            tool meanwhile.
          </p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-flex items-center font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline"
        >
          ← Back to home
        </Link>
      </div>
    </article>
  );
}
