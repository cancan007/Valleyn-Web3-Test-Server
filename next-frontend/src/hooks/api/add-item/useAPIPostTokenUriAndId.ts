import { useMutation, UseMutationOptions, useQuery } from "react-query";
import { axiosInstance } from "src/utils/url";
import { postTokenUriAndIdURL } from "src/utils/url/add-item.url";
import { jsonHeader } from "src/utils/url/header";


interface PostTokenUriAndIdProps{
    tokenUri:string;
    id:string;
}

const postTokenUriAndId = async({tokenUri,id}:PostTokenUriAndIdProps)=>{
    const headers = jsonHeader;
    const response = await axiosInstance.post(
        postTokenUriAndIdURL, 
        {headers}
    );
    return response.data;
}

export const useAPIPostTokenUriAndId = (
    mutationOptions?:UseMutationOptions<
    unknown,
    Error,
    Partial<PostTokenUriAndIdProps>>
) =>{
    return useMutation<unknown, Error, Partial<PostTokenUriAndIdProps>>((obj)=> postTokenUriAndId(obj),
    mutationOptions
    )
}