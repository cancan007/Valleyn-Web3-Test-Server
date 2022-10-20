import { AnyAction } from "redux"

type AuthenticationState = {
    name?:string,
    id?:string
}

export const authenticationReducer = (state: AuthenticationState = {}, action:AnyAction)=>{
    switch(action.type){
        case "LOADED_AUTHENTICATION":
            return{
                name:action.name,
                id:action.id
            }
        default:
            return state
    }
}