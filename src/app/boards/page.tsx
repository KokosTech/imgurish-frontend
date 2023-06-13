import Link from "next/link";

const getBoards = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/boards", {
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

const BoardsList = async () => {
  const boards = await getBoards();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 lg:p-24  pt-12">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-5xl pb-2 font-black text-center bg-gradient-to-bl from-purple-900 to-green-500 text-transparent bg-clip-text">
          <Link href={"/"}>imgurish</Link>
        </h1>
        <h2 className="text-2xl text-neutral-100 -mt-4 font-bold text-center">
          The best place to share and enjoy the most awesome images on the
          Internet.
        </h2>
        <div>
          <ul className="">
            <li className="pb-3 hover:underline">
              <Link
                href={`/boards`}
                className="text-2xl text-neutral-100 font-bold text-center"
              >
                /
              </Link>
            </li>
            {boards.map((board: string) => (
              <li key={board} className="pb-3 hover:underline">
                <Link
                  href={`/boards/${board}`}
                  className="text-2xl text-neutral-100 font-bold text-center"
                >
                  /{board}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default BoardsList;
