import { Alert } from "@chakra-ui/react";
import { getUserById } from "../api/login/useAPIGetUserById";
import { AppDispatch } from "../store";



export const loadAuth = async(dispatch:AppDispatch, name:string, id:string)=>{
  const {name:userName, id:userId} = await getUserById(id)
  if(name === userName && id === userId){
    dispatch({type:"LOADED_AUTHENTICATION", name, id})
  }else{
    console.log("Invalid name and userID")
  }
}