import Link from "next/link";

import { TbRoute } from "react-icons/tb";

const BoardsButton = () => {
  return (
    <Link
      href={"/boards"}
      className="flex justify-center items-center p-2 bg-purple-800 border border-purple-700 rounded-full shadow-lg hover:bg-purple-900 hover:purple-green-800 transition-all duration-300 ease-in-out"
    >
      <TbRoute
        size={36}
        className="font-black hover:scale-105 transition-all duration-500"
      />
    </Link>
  );
};

export default BoardsButton;
