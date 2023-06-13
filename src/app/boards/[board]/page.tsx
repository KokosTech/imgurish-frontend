import { notFound } from "next/navigation";
import PostsGrid from "@/partials/PostsGrid";
import Link from "next/link";

const getBoard = async (board: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/boards/" + board,
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

const Board = async ({
  params,
}: {
  params: {
    board: string;
  };
}) => {
  if (!params.board || params.board.length > 16) notFound();
  const posts = await getBoard(params.board);

  if (!posts && !posts.value) notFound();

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-12 sm:p-24 !pt-12">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-5xl pb-2 font-black text-center bg-gradient-to-bl from-purple-900 to-green-500 text-transparent bg-clip-text">
          <Link href={"/"}>imgurish</Link> / {params.board}
        </h1>
        <PostsGrid posts={posts.value} />
      </div>
    </main>
  );
};

export default Board;
