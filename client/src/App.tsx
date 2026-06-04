import { BrowserRouter, Route, Routes } from "react-router";
import UserPage from "./pages/user.page";
import PostPage from "./pages/post.page";
import LandingPage from "./pages/landing.page";
import PostForm from "./pages/postForm";
import UserForm from "./pages/userForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/user" Component={UserPage} />
        <Route path="/post" Component={PostPage} />
        <Route path="/addPost" Component={PostForm} />
        <Route path="/addUser" Component={UserForm} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
