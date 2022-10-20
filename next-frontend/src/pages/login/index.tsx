import { Box , Button, Input, Text} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { loadAuth } from "src/hooks/authenticate/useAuthInteractions";
import { useAppDispatch, useAppSelector } from "src/hooks/useGeneral"





const Login = () =>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const [id, setId] = useState<string>();
    const [name, setName] = useState<string>();


    if(auth.id && auth.name){
        router.push({pathname: "/"})
        return(<></>)
    }
    else{
    return(
      <Box className="h-screen text-black">
        <Head>
            <title>ログイン</title>
        </Head>
        <Box className="flex flex-col items-center h-full">
           <Text className="text-2xl">ログイン</Text>
           <Box className="flex flex-col">
             <Text>Name</Text>
             <Input onChange={(e:any)=>setName(e.target.value)} type="text" className="rounded-lg"/>
           </Box>
           <Box className="flex flex-col">
            <Text>ID</Text>
            <Input onChange={(e:any) => setId(e.target.value)} type="text" className="rounded-lg"/>
           </Box>
           <Button onClick={name && id ? ()=>loadAuth(dispatch,name, id) : () =>{}} colorScheme={"blue"} variant={"outline"}>Login</Button>
        </Box>
      </Box>
    )
    }
}
export default Login;