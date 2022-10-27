import { AnyAction } from "redux"

type AuthenticationState = {
    name?:string,
    id?:string,
    email?:string,
    access_token?:string
}

export const authenticationReducer = (state: AuthenticationState = {}, action:AnyAction)=>{
    switch(action.type){
        case "LOADED_AUTHENTICATION":
            return{
                name:action.name,
                id:action.id,
                email:action.email,
                access_token:action.access_token
            }
        case "DELETE_AUTHENTICATION":
            return{}
        default:
            return state
    }
}