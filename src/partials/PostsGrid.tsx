import { lazy, Suspense } from "react";

const PostCard = lazy(() => import("@/components/PostCard"));

const PostsGrid = ({
  posts,
}: {
  posts: [
    {
      title: string;
      description: string;
      image: string;
      created: string;
      board: string;
      id: string;
    }
  ];
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts?.map((item: any) => (
          <PostCard
            title={item.title}
            description={item.description}
            image={item.image}
            created={item.created}
            board={item.PartitionKey}
            id={item.RowKey}
            key={item.RowKey}
          />
        ))}
      </div>
    </Suspense>
  );
};

export default PostsGrid;