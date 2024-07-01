import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Blog from "./pages/Blogs.tsx";
import Blogs from "./pages/Blog.tsx";
import Publish from "./pages/Publish.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/new" element={<Publish />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/blog/:id" element={<Blogs />} />
      <Route path="/blogs" element={<Blog />} />
    </Routes>
  </BrowserRouter>
)
