import axios from "axios";
import { BigNumber } from "ethers";
import { useQuery } from "react-query";
import { axiosInstance } from "src/utils/url";
import { jsonHeader } from "src/utils/url/header"
import { getItemsByUserUrl } from "src/utils/url/my-items.url";


export interface getItemsByUserSearchResult{
    tokenId:BigNumber;
    ic: string;
    ownerId: string;
    txTime: BigNumber;
    tokenURI: string;
    title?:string;
    description?:string;
    image?:string;
}


const getItemsByUser = async(ID:string) =>{
    const headers = jsonHeader;
    const response = await axiosInstance.get(
        getItemsByUserUrl + `/${ID}`,
        {headers}
    )
    let res = await Promise.all(response.data.map(async(item:getItemsByUserSearchResult)=>{
        try{
            const res = await axios.get(
                item.tokenURI
            )
            const {data}:{data:MetaData} = res;
            const {name:title, description, image} = data;
            return {...item, title, description, image}
        }catch{
            
        }
    }))

    res = res.filter((item:getItemsByUserSearchResult & MetaData)=>item !== undefined)
    return res;
}

export const useAPIGetItemsByUser = (id:string) =>{
    return useQuery<getItemsByUserSearchResult[], Error>(
        "getItemsByUser",
        () => getItemsByUser(id)
    )
}