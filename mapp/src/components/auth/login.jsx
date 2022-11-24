import React, { useState } from "react";
import { LoginUser } from "../service/api";
import { useNavigate } from "react-router";

const inpvalues = {
  email: "",
  password: "",
};
export const Login = () => {
  const navigate =  useNavigate("")

  const [user, setUser] = useState(inpvalues);
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitbtn = async (e) => {
    e.preventDefault();
    try {
      let res = await LoginUser(user);
      if(res){

        console.log("responce", res.data);
        navigate("/alluser")
        
        setUser(inpvalues);
      }
    } catch (err) {
      console.log("data submiting error", err);
    }

    // toast.success("User Added Successfully", {
    //   position: "top-right",
    //   autoClose: 1000,
    // });

    // alert("Data ADD Into MongoBD")
  };
  return (
    <>
      <div className="h-screen bg-slate-50 flex justify-center items-center w-full">
        <form>
          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
            <img
              className="h-14 mb-4 mx-auto"
              src="https://www.synointcdn.com/wp-content/uploads/2019/04/Amazon-Logo-PNG.png"
              alt=""
            />
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-semibold text-gray-600">
                Login
              </h1>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Email
                </label>
                <input
                  placeholder="Enter Email ...."
                  name="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Password
                </label>
                <input
                  placeholder="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
            </div>
            <button
              onClick={submitbtn}
              className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
