import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from "next/link"
import {Provider} from "react-redux"
import store from 'src/hooks/store';
import {QueryClient, QueryClientProvider} from "react-query"
import {Box, ChakraProvider, Text} from "@chakra-ui/react";
import { useAppDispatch } from 'src/hooks/useGeneral';
import { deleteAuth } from 'src/hooks/authenticate/useAuthInteractions';
import { Header } from 'src/components/common/Header/Header';
import React from 'react';


function MyApp({ Component, pageProps }: AppProps) {

  
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <div>
      <Header/>
      <Component {...pageProps} />
      </div>
    </Provider>
    </QueryClientProvider>
    </ChakraProvider>
    </React.StrictMode>
    )
}

export default MyApp
