import Link from "next/link";

import { TbPlus } from "react-icons/tb";

const AddButton = ({ board }: { board?: string }) => {
  return (
    <Link
      href={"/create" + (board ? "?board=" + board : "")}
      className="flex justify-center items-center p-2 bg-green-500 border border-green-600 rounded-full shadow-lg hover:bg-green-600 hover:border-green-700 transition-all duration-300 ease-in-out"
    >
      <TbPlus
        size={36}
        className="font-black hover:scale-105 transition-all duration-500"
      />
    </Link>
  );
};

export default AddButton;
