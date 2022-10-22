import { Box , Image, Text} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getAllitemsSearchResult } from "src/hooks/api/admin/useAPIGetAllitems";
import { getItemsByUserSearchResult, useAPIGetItemsByUser } from "src/hooks/api/my-items/useAPIGetItemsByUser";
import { useAppSelector } from "src/hooks/useGeneral";




const MyItems = () =>{

    const router = useRouter();
    const auth = useAppSelector(state=>state.auth);
    const {data:gettingItemsByUser, refetch} = useAPIGetItemsByUser(auth?.id);

    if(!auth.name && router.isReady){
        router.push({pathname:"/login"})
        return(<></>)
    }else if(!router.isReady){
        return (<></>)
    } else{
        
        return(
            <Box className="flex flex-col items-center">
              <Text className="text-2xl">My Items</Text>
              <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    gettingItemsByUser?.map((item:getItemsByUserSearchResult, i:number)=>{
                        return(
                            <Box key={i} className="rounded-lg border-2 border-gray-200 flex flex-col items-center justify-start h-[350px] overflow-y-auto cursor-pointer">
                            <Image src={item.image} className="object-cover rounded-t-lg h-[200px] w-full"/>
                       <Text className="text-xl">{item.title}</Text>
                       <Text className="text-sm">description:{item.description}</Text>
                       <Text className="text-sm">IC: {item.ic.slice(0, 6) + '...' + item.ic.slice(38, 42)}</Text>
                            </Box>
                        )
                    })
                }
              </Box>
            </Box>
        )
    }
}

export default MyItems;