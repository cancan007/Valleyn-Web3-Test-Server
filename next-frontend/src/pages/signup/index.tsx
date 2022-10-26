


import { Box , Text, Input, Button} from '@chakra-ui/react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react'
import { usePostRegisterUser } from 'src/hooks/api/signup/usePOSTResisterUser';

export const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repass, setRepass] = useState<string>();
  const {data: resUser, mutate: mutateRegisterUser} = usePostRegisterUser({
    onSuccess: (result) => {
      alert('Succeeded to register user');
      setUsername(undefined);
      setEmail(undefined);
      setPassword(undefined);
      setRepass(undefined);
      router.push({pathname: '/login'})
    }
  });

  const signUpUser = async() => {
    if(!username || !email || !password || !repass){
      console.log('Fill all forms');
    } else if(password !== repass){
      console.log('Please check your password');
    } else {
      mutateRegisterUser({username, email, password})
    }
  }

  return (
    <Box className="h-screen text-black">
        <Head>
            <title>サインアップ</title>
        </Head>
        <Box className="flex flex-col items-center h-full">
           <Text className="text-2xl">サインアップ</Text>
           <Box className="flex flex-col mt-4">
             <Text className="text-sm">ユーザーネーム</Text>
             <Input value={username} onChange={(e:any) => setUsername(e.target.value)} type="text" className="rounded-lg"/>
           </Box>
           <Box className="flex flex-col mt-2">
            <Text className="text-sm">メールアドレス</Text>
            <Input value={email} onChange={(e:any) =>setEmail(e.target.value)} type="email" className="rounded-lg"/>
           </Box>
           <Box className="flex flex-col mt-2">
             <Text className="text-sm">パスワード</Text>
             <Input value={password} onChange={(e:any) => setPassword(e.target.value)} type="password" className="rounded-lg"/>
           </Box>
           <Box className="flex flex-col my-2">
             <Text className="text-sm">パスワード確認用</Text>
             <Input value={repass} onChange={(e:any) => setRepass(e.target.value)} type="password" className="rounded-lg"/>
           </Box>
           <Button onClick={() => signUpUser()} colorScheme={"blue"} variant={"outline"}>登録</Button>
        </Box>
      </Box>
  )
}

export default SignUp;
