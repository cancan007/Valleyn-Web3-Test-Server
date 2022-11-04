import { axiosInstance } from "src/utils/url";
import { getTxHistoryByIcUrl } from "src/utils/url/admin.url";
import { jsonHeader } from "src/utils/url/header";
import {BigNumber, ethers} from "ethers";
import moment from "moment";
import { useQuery } from "react-query";
import { getUserById } from "./useAPIGetUserById";



export interface getTxHistoryByIcSearchResult{
    ic:string;
    currentOwnerId: string;
    txTime: any;
    time?: string;
    name?:string;
}

const getTxHistoryByIc = async(ic:string) => {
  const headers = jsonHeader;
  const response = await axiosInstance.get(
    getTxHistoryByIcUrl + `/${ic}`,
    {headers}
  )
  let res =await Promise.all(response.data.map(async(arg:getTxHistoryByIcSearchResult,i:number)=>{
    //console.log(parseInt(arg.txTime.hex, 16))
    const time = moment.unix(parseInt(arg.txTime.hex, 16)).format("YYYY-MM-DD HH:mm:ssZ");
    const user = await getUserById(arg.currentOwnerId);
    return {...arg, time, name:user.name}
  }));
  res = res.sort((a:getTxHistoryByIcSearchResult,b:getTxHistoryByIcSearchResult) => b.txTime.hex - a.txTime.hex);
  return res
}

export const useAPIGetTxHistoryByIc = ({ic}:{ic:any}) =>{
    return useQuery<getTxHistoryByIcSearchResult[], Error>(
      "getTxHistoryByIc",
      () => getTxHistoryByIc(ic)
    )
}