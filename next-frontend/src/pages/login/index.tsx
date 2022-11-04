import { Box , Button, Input, Text} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePostLoginUser } from "src/hooks/api/login/usepostLoginUser";
import { deleteAuth, loadAuth } from "src/hooks/authenticate/useAuthInteractions";
import { useAppDispatch, useAppSelector } from "src/hooks/useGeneral"


const Login = () =>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const {data:loginUser, mutate:mutateLoginUser} = usePostLoginUser({
      onSuccess: (result) => {
        loadAuth(dispatch,result);
        setUsername(undefined);
        setPassword(undefined);
      }
    })

    const login = () => {
      if(!username || !password){
        alert('Fill all forms');
        return;
      }
      mutateLoginUser({username, password});
    }

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
           <Box className="flex flex-col mt-4">
             <Text className='text-sm'>ユーザーネーム</Text>
             <Input value={username} onChange={(e:any)=>setUsername(e.target.value)} type="text" className="rounded-lg"/>
           </Box>
           <Box className="flex flex-col my-2">
            <Text className="text-sm">パスワード</Text>
            <Input value={password} onChange={(e:any) => setPassword(e.target.value)} type="password" className="rounded-lg"/>
           </Box>
           <Button onClick={()=>login()} colorScheme={"blue"} variant={"outline"}>Login</Button>
           <Box className="flex flex-row text-sm mt-2">
           <Text>ユーザー登録をしていない方はこちらから---{'>'}</Text><Text onClick={() => router.push({pathname: '/signup'})} className="text-blue-500 hover:text-blue-200 cursor-pointer">サインアップ</Text>
           </Box>
        </Box>
      </Box>
    )
    }
}
export default Login;