import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { FileType } from "lucide-react";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "PDF to Word Online – Convert PDF to DOC, DOCX",
    description:
      "Convert PDF to editable DOC or DOCX. Preserve layout and formatting. Free, browser-based.",
    keywords: ["PDF to Word", "PDF to DOC", "PDF to DOCX", "convert PDF to Word"],
    path: "/tools/pdf-to-word",
  }),
};

export default function PdfToWordPage() {
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
          <li className="text-slate-900 dark:text-slate-100">PDF to Word</li>
        </ol>
      </nav>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <FileType className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
          PDF to Word
        </h1>
        <p className="mt-3 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Convert PDF to editable DOC or DOCX. Preserve layout and formatting.
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
