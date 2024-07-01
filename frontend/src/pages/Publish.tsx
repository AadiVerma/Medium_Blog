import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';
export default function Publish(){
    const navigate=useNavigate();
    const [title,settitle]=useState<string>("");
    const [desc,setdesc]=useState<string>("");
    const handlepublish=async ()=>{
        const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
        {
            title:title,
            content:desc,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
        console.log(response);
        settitle("");
        setdesc("");
        navigate(`/blog/${response.data.id}`)
    }
    return(
        <div>
        <div className="flex justify-between p-3 bg-slate-100">
        <Link to={'/'}><h1 className="flex flex-col justify-between text-2xl font-bold cursor-pointer">BlogVerse</h1></Link>
         <div className="flex gap-2">
         <button className="bg-green-400 pl-6 pr-6 hover:bg-green-600 rounded-xl font-bold text-white" onClick={handlepublish}>Publish</button>
          <button className="bg-red-400 p-3 hover:bg-red-600 rounded-xl font-bold text-white" onClick={(e)=>{
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/signup");
          }}>Log out</button>
          <Avatar authorName={localStorage.getItem("username") || ""}/>
         </div>
         </div>
        <div className=" min-h-screen flex justify-center place-items-center bg-blue-200">
           <div className="block ">
                <input type="text" placeholder="Title" className="w-[100%] p-10 font-bold text-3xl rounded-lg outline-none bg-slate-100" onChange={(e)=>settitle(e.target.value)}/>
                <textarea onChange={(e)=>setdesc(e.target.value)}placeholder="Tell your Story" className="w-[100%] p-10 text-lg text-slate-500 font-medium mt-4 rounded-lg outline-none bg-slate-100"/>
           </div>
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