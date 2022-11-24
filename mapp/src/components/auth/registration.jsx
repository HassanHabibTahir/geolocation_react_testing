import React, { useEffect, useState } from "react";
import { RegisterUser } from "../service/api";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

const inpvalues = {
  first_name: "",
  location: {},
  email: "",
  password: "",
};
export const Registration = () => {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => {
    return state.tasks;
  });

  console.log("From Redux Current Location", currentLocation.allTodo.name);
  const [user, setUser] = useState(inpvalues);
  useEffect(() => {
    setUser({
      ...user,
      location: currentLocation.allTodo.name,
    });
  }, [currentLocation.allTodo.name]);
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitbtn = async (e) => {
    e.preventDefault();
    console.log("total user", user);

    try {
     let res= await RegisterUser(user);
     console.log("responce ======%%%%%%", res.status)
     if(res.status === 201){
      navigate('/alluser')

     }
      setUser(inpvalues);
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
                Register
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Username
                </label>
                <input
                  placeholder="First Name"
                  name="first_name"
                  value={user.first_name}
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
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Location
              </label>
              <input
                placeholder="Location Address"
                name="location"
                value={
                  currentLocation.allTodo.name.lat
                    ? currentLocation.allTodo.name.lat +
                      "," +
                      currentLocation.allTodo.name.lng
                    : "Click on map"
                }
                defaultValue
                // onChange={(e) => handleChange(e)}
                type="text"
                // readOnly={true}
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
            <button
              onClick={submitbtn}
              className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
