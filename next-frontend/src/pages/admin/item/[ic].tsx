import { Box, Image, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect, useMemo } from "react"
import { getTxHistoryByIcSearchResult, useAPIGetTxHistoryByIc } from "src/hooks/api/admin/item/useAPIGetTxHistoryByIc"
import { ItemOrganizedType } from "src/hooks/api/admin/useAPIGetAllitems"


const ItemDetail = () =>{

    const router = useRouter()
    const {ic, ownerId, owner, title, description, image, images} = router.query
    const {data:gettingTxHistory, refetch} = useAPIGetTxHistoryByIc({ic})

    useLayoutEffect(()=>{
      refetch()
    },[ic])

    return (
      <Box className="flex flex-col w-screen items-center text-black">
        <Box className="flex flex-col lg:flex-row justify-center items-center gap-x-5 p-10">
        {
                                    image && !images ? (<Image src={image} className="h-[500px] w-auto object-cover"/>)
                                    : !image && images ? (
                                        <Box className="grid grid-cols-3 lg:grid-cols-3 gap-1">
                                        {
                                            images.map((im:string, i:number) => (
                                                <Image key={i} src={im} className="object-cover  w-[200px] aspect-[4/3]"/>
                                            ))
                                        }
                                        </Box>
                                    )
                                    : <></>
                                }
          <Box className="flex flex-col items-center justify-center gap-y-2">
                <p className="text-xl">{title}</p>
                <p className="text-sm">description:{description}</p>
                <p className="text-sm">IC: {ic}</p>
                <p className="text-sm">Owner:{owner}</p>
                <p className="text-sm">OwnerID: {ownerId}</p>
          </Box>
        </Box>
        <Box className="flex flex-col w-4/5 items-center gap-y-4 mb-10">
        <Text className="text-xl">History</Text>
            {   
                gettingTxHistory?.map((history:getTxHistoryByIcSearchResult, i:number)=>{
                    return (
                        <Box key={i} className="flex flex-col">
                          
                          <Text>Owner ID: {history.currentOwnerId}</Text>
                          <Text>Transaction time: {history.time}</Text>
                        </Box>
                    )
                })
            }
        </Box>
      </Box>
    )
}

export default ItemDetail