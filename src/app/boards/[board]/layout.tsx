import AddButton from "@/partials/AddButton";
import ShareButton from "@/partials/ShareButton";

const BoardsLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    board: string;
  };
}) => {
  return (
    <>
      {children}
      <div className="fixed bottom-8 right-8 gap-4 flex flex-col">
        <ShareButton />
        <AddButton board={params.board} />
      </div>
    </>
  );
};

export default BoardsLayout;
