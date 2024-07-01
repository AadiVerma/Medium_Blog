import { useEffect, useState } from "react"
import axios from "axios";
interface datatype{
        "id":string,
        "title": string,
        "content": string,
        "author":{name:string},
        "publishedTime":string
}
export const useblog=({id}:{id:string})=>{
    const[loading,setloading]=useState<boolean>(true);
    const [blog,setblog]=useState<datatype>();
    useEffect(()=>{
     const fetchData=async()=>{
         const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
         {
             headers:{
                Authorization :`Bearer ${localStorage.getItem('jwt')}`
             }
         });
         setloading(false);
         setblog(response.data.blog);
     }
      fetchData();
    },[id]);
    return {loading,blog};
}
export const useData=()=>{
   const[loading,setloading]=useState<boolean>(true);
   const [data,setdata]=useState<datatype[]>();
   useEffect(()=>{
    const fetchData=async()=>{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,
        {
            headers:{
               Authorization :`Bearer ${localStorage.getItem('jwt')}`
            }
        });
        setloading(false);
        console.log(response.data.blogs);
        setdata(response.data.blogs);
    }
     fetchData();
   },[]);
   return {loading,data};
}