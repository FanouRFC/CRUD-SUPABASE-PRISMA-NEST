import { postApi } from "@/api/post.api";
import MyTable from "@/components/table";
import { useEffect, useState } from "react";
import type { post } from "../types/tableType";

export default function UserPage() {
  const [post, setPost] = useState<post[]>([]);

  async function getPost() {
    const data = await postApi.getPosts();
    console.log(data);
    setPost(data);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="w-full">
      <p className="text-4xl font-medium text-center">Post</p>
      <MyTable
        header={["id", "title", "content", "published", "author", "action"]}
        contentType="post"
        content={post}
      />
    </div>
  );
}
