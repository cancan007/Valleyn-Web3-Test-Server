import { Alert } from "@chakra-ui/react";
import { getUserById } from "../api/login/useAPIGetUserById";
import { LoginUserResultType } from "../api/login/usepostLoginUser";
import { AppDispatch } from "../store";



export const loadAuth = (dispatch:AppDispatch, user: LoginUserResultType)=>{
  dispatch({type:"LOADED_AUTHENTICATION", name: user.username, id:user.id, email:user.email, access_token: user.access_token})
}