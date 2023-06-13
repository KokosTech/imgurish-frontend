import AddButton from "@/partials/AddButton";
import PostsGrid from "@/partials/PostsGrid";
import BoardsButton from "@/partials/BoardsButton";

const getFeed = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/feed", {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

const Home = async () => {
  const feed = await getFeed();

  if (!feed && !feed.value) {
    return {
      notFound: true,
    };
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 lg:p-24 !pt-12">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-5xl pb-2 font-black text-center bg-gradient-to-bl from-purple-900 to-green-500 text-transparent bg-clip-text">
          imgurish
        </h1>
        <h2 className="text-2xl text-neutral-100 -mt-4 font-bold text-center">
          The best place to share and enjoy the most awesome images on the
          Internet.
        </h2>
        <PostsGrid posts={feed.value} />
      </div>
      <div className="fixed bottom-8 right-8 gap-4 flex flex-col">
        <BoardsButton />
        <AddButton />
      </div>
    </main>
  );
};

export default Home;
