import { postApi } from "@/api/post.api";
import MyTable from "@/components/table";
import { useEffect, useState, type ChangeEvent } from "react";
import type { post } from "../types/tableType";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function PostPage() {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<post[]>([]);

  async function getPost() {
    var data: any = [];
    if (search) {
      setIsLoading(true);
      data = await postApi.getPostByTitle(search);
    } else {
      data = await postApi.getPosts();
    }
    console.log(data);
    setIsLoading(false);
    setPost(data);
  }

  useEffect(() => {
    getPost();
  }, [search]);

  console.log(search);

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
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner className=" size-15" />
          </div>
        ) : (
          <MyTable
            header={[
              "id",
              "title",
              "content",
              "published",
              "author",
              "actions",
            ]}
            contentType="post"
            content={post}
          />
        )}
      </div>
    </div>
  );
}
