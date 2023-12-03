import { post } from "prisma/prisma-client";
import { useState } from "react";

const Post = ({ data }: { data: post }) => {
  return (
    <div className="border-4 border-purple-600 rounded flex flex-col items-center gap-10 p-5">
      <h3 className="text-2xl">{data.title}</h3>
      <p>{data.text}</p>
      <span className="">
        {data.username}
      </span>
    </div>
  );
};

export default Post;
