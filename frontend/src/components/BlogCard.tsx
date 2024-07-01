import { Link } from "react-router-dom";

interface BlogCradProps {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
  id: string;
}
export default function BlogCard({
  authorName,
  publishedDate,
  title,
  content,
  id,
}: BlogCradProps) {
  return (
    <div className="w-[50%] mt-3 border-2 border-solid p-4 rounded-xl bg-slate-100">
      <Link to={`/blog/${id}`}>
        <div className="flex gap-2">
          <Avatar
            authorName={authorName == "null" ? "Anonymous" : authorName}
          />
          <div className="font-medium text-xl mt-1">
            {authorName == "null" ? "Anonymous" : authorName}.
          </div>
          <div className="text-slate-500 font-medium  mt-2 text-md">
            {publishedDate}
          </div>
        </div>
        <div className="font-bold text-3xl cursor-pointer mt-2">{title}</div>
        <div className="flex-wrap text-lg text-slate-500 font-medium mt-3 cursor-pointer">
          {content.slice(0, 150) + "..."}
        </div>
        <div className="mt-4 text-slate-500 font-medium">
          {`${Math.ceil(content.length / 500)} min read`}
        </div>
      </Link>
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
