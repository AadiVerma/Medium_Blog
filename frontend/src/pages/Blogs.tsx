import { useNavigate,Link } from "react-router-dom";
import  BlogCard from "../components/BlogCard";
import { useData } from "../hooks/getdata";

export default function Blog(){
    const {loading,data}=useData();
    const navigate=useNavigate();
    const formatDate = (dateStr:string) => {
      const date = new Date(dateStr);
      const options:Object = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
    if(loading){
        return (
            <div className="flex justify-center place-items-center h-screen">
                <h1 className=" text-3xl font-bold">Loading...</h1>;
            </div>
        )
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
       <div className="grid grid-cols-1 place-items-center p-4 bg-blue-200">
        {data && data.map(d=><BlogCard 
         authorName={`${d.author.name}`} id={d.id} content={d.content}  publishedDate={formatDate(d.publishedTime)}  title={d.title}/>)}
       </div>
      </div>
    )
  }
  function Avatar({authorName}:{authorName:string}){
    return (
        <div className="h-10 w-10 rounded-full bg-blue-500 flex justify-center items-center">
           <span className="text-white">{authorName[0]}</span>
        </div>
    )
}