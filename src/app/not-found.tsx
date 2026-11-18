import Link from "next/link";
import { person } from "@/lib/content";

export default function NotFound() {
  return (
    <main
      id="main"
      className="shell flex flex-1 flex-col justify-center py-28"
    >
      <p className="caption-3 font-mono text-ink-soft">404</p>
      <h1 className="display-1 mt-4 max-w-[16ch]">This page moved on.</h1>
      <p className="body-3 mt-6 max-w-[46ch] text-ink-soft">
        The link is broken or the page never existed. Everything worth reading
        is on the home page.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="button-md rounded-full bg-ink px-6 py-3 text-cream transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-pink-deep hover:text-ink active:scale-[0.98]"
        >
          Back home
        </Link>
        <a
          href={person.github}
          target="_blank"
          rel="noreferrer"
          className="button-md rounded-full border border-ink px-6 py-3 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink hover:text-cream active:scale-[0.98]"
        >
          GitHub
        </a>
      </div>
    </main>
  );
}
