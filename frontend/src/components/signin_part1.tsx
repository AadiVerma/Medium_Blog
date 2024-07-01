import { useState } from "react";
import { Link } from "react-router-dom";
import { signinInput } from "@aadiverma/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignInLeft() {
  const [inputparams, setinputparams] = useState<signinInput>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  async function sendrequest() {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
        inputparams
      );
      const jwt = result.data;
      localStorage.setItem("jwt", jwt.jwt); 
      localStorage.setItem("username",result.data.name);
      navigate("/");
    } catch (error) {
      alert("Something went wrong");
    }
  }
  return (
    <div className="h-screen flex justify-center items-center w-[100%]">
      <div className="p-20">
        <h1 className="text-4xl font-bold flex justify-center mb-1">
          LogIn to your account
        </h1>
        <div className="flex gap-2 justify-center mb-4 text-gray-500 font-semibold">
          <h2 className="">Don't have an account?</h2>
          <Link to={"/signup"} className="underline hover:text-black">
            SignUp
          </Link>
        </div>
        <h2 className="font-semibold text-base text-gray-500 mb-2">Email</h2>
        <input
          type="email"
          className="p-2 w-96 border-2 outline-none focus:border-blue-500 border-solid rounded-md text-lg font-semibold mb-2"
          placeholder="abc@gmail.com"
          onChange={(e) => {
            setinputparams((c) => ({
              ...c,
              email: e.target.value,
            }));
          }}
          value={inputparams.email}
        />
        <h2 className="font-semibold text-base text-gray-500 mb-2">Password</h2>
        <input
          type="password"
          className="p-2 w-96 border-2 outline-none focus:border-blue-500 border-solid rounded-md text-lg font-semibold block mb-4"
          placeholder="*******"
          onChange={(e) => {
            setinputparams((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
          value={inputparams.password}
        />
        <button className="bg-black text-white p-2 rounded-md text-base font-semibold w-96" onClick={sendrequest}>
          Log In
        </button>
      </div>
    </div>
  );
}
