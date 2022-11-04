import { Box, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppSelector } from 'src/hooks/useGeneral'
import styles from 'src/styles/Home.module.css'


const Home: NextPage = () => {

  const router = useRouter()
  const auth = useAppSelector(state => state.auth);
  if(!auth.name && router.isReady){
      router.push({pathname:"/login"});
      return(<></>)
  } else if(!router.isReady){
    return(<></>)
  }else{
  return (
    <Box>
      <Head>
        <title>Valleyin Auction</title>
        <meta name="description" content="Welcome to Valleyin Auction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className="w-screen h-screen flex flex-col items-center justify-center">
        <Text className="text-4xl">Welcome to Valleyin Auction</Text>
      </Box>
    </Box>
  )
  }
}

export default Home
