import axios from "axios";

const URL = "http://localhost:8000"

export const RegisterUser = async(data)=>{

  // console.log("input data",data)
    try{
      // console.log("listening to addUser", data)
      return await axios.post(`${URL}/register`, data)
    

    } catch(err){
        console.log("Error While Calling addUser API", err);

    }
}

export const LoginUser = async(data)=>{

  // console.log("input login data",data)
    try{
      // console.log("listening to addUser", data)
      return await axios.post(`${URL}/login`, data)
    

    } catch(err){
        console.log("Error While Calling Login user API", err);

    }
}

export const getUsers = async()=>{
  try{
    // console.log("listening to getUsers")
    return await axios.get(`${URL}/all`)

  } catch(err){
      console.log("Error While Calling getUsers API", err);

  }
}