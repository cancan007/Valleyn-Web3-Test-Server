import { useQuery } from "react-query";
import { axiosInstance } from "src/utils/url";
import { jsonHeader } from "src/utils/url/header";
import { getUserByIdUrl } from "src/utils/url/login.url";



export interface getUserByIdSearchResult{
    name:string;
    id:string;
}


export const getUserById = async(ID:string)=>{
    const headers = jsonHeader;
    const url = getUserByIdUrl + `/${ID}`;
    const response= await axiosInstance.get(
        url,
        {headers}
    )
    const {name, userId:id} = response.data;
    return {name, id}
}

export const useAPIGetUserById = (id:string) => {
    return useQuery<getUserByIdSearchResult, Error>(
        "getUserById",
        () => getUserById(id)
    )
}