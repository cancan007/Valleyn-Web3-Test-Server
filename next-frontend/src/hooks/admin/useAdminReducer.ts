type AdminState = {
    contract?: Object
}

export const adminReducer = (state: AdminState = {}, action:AnyAction)=>{
    switch(action.type){
        case "LOADED_ADMIN":
            return{
                ...state,
                contract:action.contract
            }
        default:
            return state
    }
}