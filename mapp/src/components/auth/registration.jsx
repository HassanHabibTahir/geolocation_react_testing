// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useSelector } from "react-redux";

// const inpvalues = {
//   first_name: "",
//   // location: {
//   //   lat:"",
//   //   lng:""
//   // },
//   email: "",
//   password: "",
// };

// const SignupSchema = Yup.object({
//   first_name: Yup.string()
//     .min(2, "Too Short!")
//     .max(70, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string().min(6, "To Short!").max(40, "To Long!"),
//   // location: Yup.object().shape({
//   //   lat: Yup.string().required(),
//   //   lng: Yup.string().required(),
//   // }),
// });

// export const Registration = () => {
//   // const navigate = useNavigate()
//   const currentLocation = useSelector((state) => {
//     return state.tasks;
//   });

//   // console.log("From Redux Current Location", currentLocation.allTodo.name);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     setUser({
//       ...user,
//       location: currentLocation.allTodo.name,
//     });
//   }, [currentLocation.allTodo.name]);

//   // const handleChange = (e) => {
//   //   console.log(e.target.name, e.target.value);
//   //   setUser({ ...user, [e.target.name]: e.target.value });
//   // };
//   const langitudes = {
//     lat: user.location && user.location.lat,
//     lng: user.location && user.location.lng
//   }
// console.log("My Redux value ",   langitudes
// )
//   return (
//     <>
//       <div className="h-screen bg-slate-50 flex justify-center items-center w-full">
//         <Formik
//           initialValues={{
//             first_name: "",
//             location: {
            
//             //  lat: user.location?.lat,
//             //  lng: user?.location.lng
//             },
//             email: "",
//             password: "",
//           }}
//           validationSchema={SignupSchema}
//           onSubmit={(values) => {

//             console.log("formik in input on submisson", values);
//           }}
//           enableReinitialize={true}
//         >
//           {({ errors, touched }) => (
//             <Form>
//               <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
//                 <h1 className="text-center text-2xl font-semibold text-gray-600">
//                   Register
//                 </h1>

//                 <div className="">
//                   <label
//                     htmlFor="email"
//                     className="block mb-1 text-gray-600 font-semibold"
//                   >
//                     Username
//                   </label>

//                   <Field
//                     placeholder=" Name"
//                     name="first_name"
                    
//                     type="text"
//                     className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
//                   />
//                   {errors.first_name && touched.first_name ? (
//                     <div>{errors.first_name}</div>
//                   ) : null}
//                   {/* <ErrorMessage name="first_name" /> */}

//                   <div className="">
//                     <label
//                       htmlFor="email"
//                       className="block mb-1 text-gray-600 font-semibold"
//                     >
//                       Email
//                     </label>

//                     <Field
//                       placeholder="Enter Email ...."
//                       name="email"
//                       // value={inpvalues.email}
//                       // onChange={(e) => handleChange(e)}
//                       type="text"
//                       className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
//                     />
//                   {errors.email && touched.email ? (
//                     <div>{errors.email}</div>
//                   ) : null}
//                   {/* <ErrorMessage name="email" /> */}
//                   </div>

//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="email"
//                     className="block mb-1 text-gray-600 font-semibold"
//                   >
//                     Password
//                   </label>

//                   <Field
//                     type="password"
//                     name="password"
//                     // value={inpvalues.password}
//                     placeholder="Enter Password"
//                     // onChange={(e) => handleChange(e)}
//                     className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
//                   />


//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="email"
//                     className="block mb-1 text-gray-600 font-semibold"
//                   >
//                     Location
//                   </label>

//                   <Field
//                     type="text"
//                     name="location"
//                     // value={
                    
//                     // }
//                     readOnly
//                     placeholder="Click on Map"
//                     //  onChange={(e) => handleChange(e)}
//                     className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
//                   />
//                 </div>

//                 <button
//                   className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide"
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

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
    //  console.log("responce ======%%%%%%", res.status)
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
                    : ""
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
