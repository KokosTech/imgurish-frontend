import Link from "next/link";

export const metadata = {
  title: "404 - No Such Board, Yet...",
  description: "404 - No Such Board, Yet...",
  openGraph: {
    title: "404 - No Such Board, Yet...",
    description: "404 - No Such Board, Yet...",
    siteName: "imgurish",
  },
};

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <h2 className="bg-gradient text-transparent bg-clip-text text-5xl font-black">
        No Such Board, Yet...
      </h2>
      <Link
        href="/"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] py-[10px] px-5 text-base font-semibold text-white transition-all hover:bg-primary"
      >
        Go Back to Feed
      </Link>
    </div>
  );
}
