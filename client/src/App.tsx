import { useEffect, useState } from "react";
import "./App.css";
import MyTable from "./components/table";
import { userApi } from "./api/user.api";
import type { user, post } from "./types/tableType";
import { postApi } from "./api/post.api";

function App() {
  const [user, setUser] = useState<user[]>([]);
  const [post, setPost] = useState<post[]>([]);

  async function getPost() {
    const data = await postApi.getPosts();
    console.log(data);
    setPost(data);
  }

  async function getUser() {
    const data = await userApi.getUsers();
    setUser(data);
  }

  useEffect(() => {
    getUser();
    getPost();
  }, []);

  return (
    <div>
      <p className="">Hello World</p>
      <MyTable
        header={["id", "name", "email", "action"]}
        contentType="user"
        content={user}
      />

      <MyTable
        header={["id", "title", "content", "published", "author", "action"]}
        contentType="post"
        content={post}
      />
    </div>
  );
}

export default App;
