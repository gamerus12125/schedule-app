"use client";
import axios from "axios";
import Post from "../Post/Post";
import Input from "../ui/Input/Input";
import { useState, useEffect } from "react";
import { post } from "prisma/prisma-client";
import Button from "../ui/Button/Button";

const PostPage = () => {
  const [data, setData] = useState<post[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    axios.get("api/posts").then((res) => setData(res.data.data));
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl">Посты</h1>
      <form className=" my-10 flex flex-col items-center">
        <label>Поиск</label>
        <Input
          className="w-1/3 lg:w-1/2"
          placeholder=""
          required={false}
          type="text"
          onChange={setSearch}
        />
      </form>
      <Button type="button">Создать пост</Button>
      {data ? (
        <ul className="flex flex-row justify-center border-t-4 border-purple-600 mt-10">
          {search
            ? data
                .filter((post) =>
                  post.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((post) => (
                  <li key={post.id} className="my-10">
                    {<Post data={post} />}
                  </li>
                ))
            : data.map((post) => (
                <li key={post.id} className="my-10">
                  {<Post data={post} />}
                </li>
              ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostPage;
