"use client";

import { useState } from "react";

const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const CreatePost = ({
  searchParams,
}: {
  searchParams: {
    board?: string;
  };
}) => {
  const [board, setBoard] = useState(searchParams.board || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!board) {
        throw new Error("Board is required");
      } else if (!title) {
        throw new Error("Title is required");
      } else if (!description) {
        throw new Error("Description is required");
      } else if (!file) {
        throw new Error("File is required");
      }

      if (
        board.length > 16 ||
        title.length > 64 ||
        description.length > 256 ||
        board.match(/[^a-zA-Z0-9._-]/)
      ) {
        throw new Error("Invalid input");
      }

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)/)) {
        throw new Error("Invalid file type");
      }

      if (file.size > 8 * 1024 * 1024) {
        throw new Error("File too large (max 8MB)");
      }

      const fileBase64 = await convertFileToBase64(file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boards/${board}/posts`,
        {
          method: "POST",
          cache: "force-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            filename: file.name,
            image: fileBase64,
          }),
        }
      );

      setLoading(false);

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (!data) {
        throw new Error("Invalid response");
      }

      window.location.href = `/boards/${data.PartitionKey}/posts/${data.RowKey}`;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 p-6 sm:p-12 lg:p-24  !pt-12">
      <h1 className="text-5xl pb-2 font-black text-center bg-gradient-to-bl from-purple-900 to-green-500 text-transparent bg-clip-text">
        Create Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full flex flex-col gap-4 items-center justify-center"
      >
        <input
          type="text"
          name="title"
          placeholder="Title of the post"
          className="w-full p-2 borde bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="An interesting description"
          className="w-full p-2 borde bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg resize-none"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          name="file"
          accept="image/*"
          multiple={false}
          /* add design to add file button */
          className="w-full p-2 border bg-zinc-900  border-zinc-700 rounded-lg shadow-lg resize-none text-white 
                      file:mr-8 file:py-2 file:px-4
                      file:rounded-md file:border
                      file:border-zinc-700 file:border-solid
                      file:text-sm file:font-semibold
                      file:bg-zinc-800 file:text-white
                      hover:file:bg-zinc-700 hover:file:border-zinc-600
                      hover:file:cursor-pointer focus:file:outline-none focus:file:ring-2 focus:file:ring-offset-2 focus:file:ring-zinc-5"
          onChange={handleFileChange}
        />
        <input
          type="text"
          name="board"
          placeholder="Board"
          className="w-full p-2 borde bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg resize-none"
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        />
        <button
          disabled={loading}
          type="submit"
          className="p-2 bg-green-700 w-full border border-green-800 rounded-lg shadow-lg hover:bg-green-800 hover:border-green-900 transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
