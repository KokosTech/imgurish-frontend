"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbShare } from "react-icons/tb";

const ShareButton = () => {
  const path = usePathname();

  const [copied, setCopied] = useState(false);
  const [pageURL, setPageURL] = useState("");
  const [isNativeShare, setNativeShare] = useState(false);

  const handleCopy = () => {
    navigator?.clipboard.writeText(`${window.location.origin}${path}`);
    setCopied(true);

    try {
      navigator
        ?.share({
          title: window.document.title,
          text: window.document.title,
          url: `${window.location.origin}${path}`,
        })
        .then(() => console.log("Successful share! 🎉"))
        .catch((err) => console.error(err));
    } catch (err) {
      console.warn("Browser doesn't support native share");
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="flex justify-center items-center p-2 bg-purple-800 border border-purple-700 rounded-full shadow-lg hover:bg-purple-900 hover:purple-green-800 transition-all duration-300 ease-in-out"
      >
        <TbShare
          size={36}
          className="font-black hover:scale-105 transition-all duration-500"
        />
      </button>
    </>
  );
};

export default ShareButton;
