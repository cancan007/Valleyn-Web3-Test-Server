import { Alert } from "@chakra-ui/react";
import { getUserById } from "../api/admin/item/useAPIGetUserById";
import { LoginUserResultType } from "../api/login/usepostLoginUser";
import { AppDispatch } from "../store";



export const loadAuth = (dispatch:AppDispatch, user: LoginUserResultType)=>{
  dispatch({type:"LOADED_AUTHENTICATION", name: user.username, id:user.id, email:user.email, access_token: user.access_token})
  localStorage.setItem('userToken', user.access_token);
}

export const deleteAuth = (dispatch:AppDispatch) => {
  dispatch({type: "DELETE_AUTHENTICATION"});
  localStorage.removeItem('userToken');
}