import Link from "next/link";
import { notFound } from "next/navigation";

const getPost = async ({ board, post }: { board: string; post: string }) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/boards/" + board + "/posts/" + post,
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

const Post = async ({
  params,
}: {
  params: {
    board: string;
    post: string;
  };
}) => {
  if (!params.board || params.board.length > 16 || !params.post) notFound();

  let post = await getPost(params);

  if (!post && !post.value) {
    return {
      notFound: true,
    };
  }

  post = post?.value[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between !pt-12 p-6 sm:p-12 lg:p-24 ">
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-5xl pb-2 font-black text-center bg-gradient-to-bl from-purple-900 to-green-500 text-transparent bg-clip-text">
          <Link href={`/boards/${params.board}`}>{params.board}</Link> /{" "}
          {post.title}
        </h1>
        <div className="w-full md:w-2/3 lg:w-1/2 rounded-xl bg-zinc-900 border border-zinc-800">
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-xl bg-zinc-900 border-b border-zinc-800"
          />
          <p className="text-2xl text-center p-2">{post.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center">
        <Link href={"/boards/" + params.board}>
          <p className="p-2 pt-4 text-2xl font-bold hover:font-extrabold transition-all text-center bg-gradient-to-bl from-purple-900 to-green-500 text-transparent bg-clip-text">
            Back to board
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Post;
