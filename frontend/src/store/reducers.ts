import {AnyAction} from "redux";

type providerType = {
    connection?: Object,
    chainId?: number,
    balance?:number
}

export const providerReducer = (state: providerType = {}, action:AnyAction)=>{
    switch(action.type){
        case "PROVIDER_LOADED":
            return{
                ...state,
                connection: action.connection
            }
        case "NETWORK_LOADED":
            return {
                ...state,
                chainId: action.chainId
            }
        case "BALANCE_LOADED":
            return {
                ...state,
                balance: action.balance
            }
        default:
            return state;
    }
}

type vtAdminType = {
    contract?: Object
}

export const vtAdminReducer = (state: vtAdminType = {}, action:AnyAction)=>{
    switch(action.type){
        case "VTADMIN_LOADED":
            return{
                ...state,
                contract:action.contract
            }
        default:
            return state
    }
}