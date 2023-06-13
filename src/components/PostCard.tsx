import Link from "next/link";

const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleDateString("en-UK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const PostCard = ({
  title,
  description,
  image,
  created,
  board,
  id,
}: {
  title: string;
  description: string;
  image: string;
  created: string;
  board: string;
  id: string;
}) => {
  return (
    <Link
      className="flex flex-col gap-4 items-center justify-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:scale-[101%] transition-all"
      href={`/boards/${board}/posts/${id}`}
      key={id}
    >
      <div className="w-full p-4 flex items-center aspect-square rounded-md overflow-hidden bg-zinc-950">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full aspect-square object-scale-down"
        />
      </div>
      <div className="w-full p-4 bg-zinc-800 rounded-lg">
        <h3 className="font-bold text-2xl">{title}</h3>
        {/* <Link href={`/boards/${item.PartitionKey}`}>
                {item.PartitionKey}
              </Link> */}
        <object>
          <Link
            href={`/boards/${board}`}
            className="text-md text-neutral-400 hover:underline"
          >
            /{board}
          </Link>
        </object>
        <p className="text-right text-sm text-neutral-400">
          {formatDateTime(created)}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
