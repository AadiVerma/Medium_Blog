import { useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "@aadiverma/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUpLeft() {
  const [inputparams, setinputparams] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  async function sendrequest() {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
        inputparams
      );
      const jwt = result.data;
      localStorage.setItem("jwt", jwt.jwt);
      localStorage.setItem("username",inputparams.name || "");
      navigate("/");
    } catch (error) {
      alert("Something went wrong");
    }
  }
  return (
    <div className="h-screen flex justify-center items-center w-[100%]">
      <div className="p-20">
        <h1 className="text-4xl font-bold flex justify-center mb-1">
          Create an account
        </h1>
        <div className="flex gap-2 justify-center mb-4 text-gray-500 font-semibold">
          <h2 className="">Already have an account?</h2>
          <Link to={"/signin"} className="underline hover:text-black">
            Login
          </Link>
        </div>
        <h2 className="font-semibold text-base text-gray-500 mb-2">Username</h2>
        <input
          type="text"
          className="p-2 w-96 border-2 outline-none focus:border-blue-500 border-solid rounded-md text-lg font-semibold mb-2"
          placeholder="Enter your username"
          onChange={(e) => {
            setinputparams((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
          value={inputparams.name}
        />
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
        <button
          className="bg-black text-white p-2 rounded-md text-base font-semibold w-96"
          onClick={sendrequest}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
