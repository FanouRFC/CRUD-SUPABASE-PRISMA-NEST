import { postApi } from "@/api/post.api";
import MyTable from "@/components/table";
import { useEffect, useState } from "react";
import type { post, user } from "../types/tableType";
import { userApi } from "@/api/user.api";

export default function PostPage() {
  const [user, setUser] = useState<user[]>([]);
  async function getUser() {
    const data = await userApi.getUsers();
    setUser(data);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full">
      <p className="text-4xl font-medium text-center">Post</p>
      <MyTable
        header={["id", "title", "content", "published", "author", "action"]}
        contentType="post"
        content={user}
      />
    </div>
  );
}
