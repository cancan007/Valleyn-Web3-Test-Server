import axios from "axios";
import { useQuery } from "react-query";
import { axiosInstance } from "src/utils/url";
import { getAllitemsUrl } from "src/utils/url/admin.url";
import { jsonHeader } from "src/utils/url/header";




export interface getAllitemsSearchResult{
    tokenId:BigInt;
    ic:string;
    ownerId:string;
    txTime:BigInt;
    tokenURI:string;
    name:string;
}

export interface MetaData{
    image:string;
    name:string;
    description:string;
}

export type ItemOrganizedType = getAllitemsSearchResult & MetaData &{
    title:string;
}

const getAllitems = async()=>{
    const headers = jsonHeader;
    const response = await axiosInstance.get(
        getAllitemsUrl,
        {headers}
    )
    let res = await Promise.all(response.data.map(async(item:getAllitemsSearchResult)=>{
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
    res = res.filter((item:ItemOrganizedType)=>item !== undefined)
    return res;
}

export const useAPIGetAllitems = ()=>{
    return useQuery<Array<ItemOrganizedType>, Error>(
        "getAllitems",
        ()=>getAllitems()
    )
}