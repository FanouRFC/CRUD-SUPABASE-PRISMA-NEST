import { postApi } from "@/api/post.api";
import MyTable from "@/components/table";
import { useEffect, useState, type ChangeEvent } from "react";
import type { post } from "../types/tableType";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function PostPage() {
  const [search, setSearch] = useState<string>("");
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center relative">
          <Search className="absolute left-2" />
          <Input
            type="text"
            placeholder="recherche par titre"
            className="w-75 border border-b rounded-lg ps-10"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <MyTable
          header={["id", "title", "content", "published", "author", "action"]}
          contentType="post"
          content={post}
        />
      </div>
    </div>
  );
}
