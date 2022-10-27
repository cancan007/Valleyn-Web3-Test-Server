import { useQuery } from "react-query";
import { axiosInstance } from "src/utils/url";
import { getAllUsersUrl } from "src/utils/url/admin.url";
import { jsonHeader } from "src/utils/url/header"


const getAllUsers = async()=>{
    const headers = jsonHeader;
    const response = await axiosInstance.get(
      getAllUsersUrl,
      //{headers}
    )
    return response.data
}


export const useAPIGetAllUsers = ()=>{
    return useQuery<User[], Error>(
        'getAllUsers',
        () => getAllUsers()
    )
}