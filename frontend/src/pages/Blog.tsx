import { useParams } from "react-router-dom";
import { useblog } from "../hooks/getdata";
import { useNavigate,Link } from "react-router-dom";
export default function Blogs() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, blog } = useblog({ id: id || "" });
  const formatDate = (dateStr:string) => {
    const date = new Date(dateStr);
    const options:Object = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  if (loading) {
    return (
      <div className="flex justify-center place-items-center h-screen">
        <h1 className=" text-3xl font-bold">Loading...</h1>;
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between p-3 bg-slate-100">
      <Link to={'/'}><h1 className="flex flex-col justify-between text-2xl font-bold cursor-pointer">BlogVerse</h1></Link>
             <div className="flex gap-2">
             <button className="bg-green-400 pl-6 pr-6 hover:bg-green-600 rounded-xl font-bold text-white" onClick={()=>navigate('/new')}>New</button>
              <button className="bg-red-400 p-3 hover:bg-red-600 rounded-xl font-bold text-white" onClick={(e)=>{
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                navigate("/signup");
              }}>Log out</button>
              <Avatar authorName={localStorage.getItem("username") || ""}/>
             </div>
          </div>
    <div className="flex gap-2 p-4 bg-blue-200 min-h-screen">
      
      {blog && (<div className="w-[70%] p-10 border-2 rounded-lg bg-slate-100">
        <h1 className="text-4xl font-bold text-black">
          {blog.title}
        </h1>
        <h2 className="mt-3 text-slate-500 font-medium">
          Posted on  {formatDate(blog.publishedTime)}
        </h2>
        <h3 className="mt-4 text-slate-900 text-lg  font-medium">
        {blog.content}
        </h3>
      </div>)}
     { blog && (<div className="w-[30%] rounded-lg border-2 h-fit p-4 bg-slate-100">
        <h1 className="font-semibold text-slate-600">Author</h1>
        <div className="flex gap-2 mt-3">
          <Avatar authorName={blog.author.name} />
          <h2 className="mt-1 font-bold text-lg">{blog.author.name}</h2>
        </div>
        <h3 className="mt-4 text-slate-500 font-medium">
          Blog Writer, Engaging writer crafting meaningful connections with
          readers through insightful content.
        </h3>
      </div>)}
    </div>
    </div>
  );
}
function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="h-10 w-10 rounded-full bg-blue-500 flex justify-center items-center">
      <span className="text-white">{authorName[0]}</span>
    </div>
  );
}
