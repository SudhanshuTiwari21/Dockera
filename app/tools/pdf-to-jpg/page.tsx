import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "PDF to JPG Online – Convert PDF Pages to Images",
    description:
      "Convert each PDF page to JPG or extract all images from a PDF. Free, browser-based.",
    keywords: ["PDF to JPG", "PDF to image", "convert PDF to JPG", "PDF page to image"],
    path: "/tools/pdf-to-jpg",
  }),
};

export default function PdfToJpgPage() {
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
          <li className="text-slate-900 dark:text-slate-100">PDF to JPG</li>
        </ol>
      </nav>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ImageIcon className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
          PDF to JPG
        </h1>
        <p className="mt-3 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Convert each PDF page to JPG or extract all images from a PDF.
        </p>
        <div className="mt-8 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-8 py-12">
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">Coming soon</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            This tool is under development. Check back later.
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
