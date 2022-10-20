import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from "next/link"
import {Provider} from "react-redux"
import store from 'src/hooks/store';
import {QueryClient, QueryClientProvider} from "react-query"
import {ChakraProvider} from "@chakra-ui/react";


function MyApp({ Component, pageProps }: AppProps) {

  
  const queryClient = new QueryClient();
  

  return (
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <div>
      <nav className='border-b p-6'>
        <p className="text-4xl font-bold p-5">Valleyin Auction</p>
        <div className='flex mt-4'>
          <Link href="/">
            <a className='mr-6 text-pink-500'>
              Home
            </a>
          </Link>
          <Link href="/add-item">
            <a className='mr-6 text-pink-500'>
              Add Item
            </a>
          </Link>
          <Link href="/my-items">
            <a className='mr-6 text-pink-500'>
              My Items
            </a>
          </Link>
          <Link href="/admin">
          <a className='mr-6 text-pink-500'>
            Admin
          </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
      </div>
    </Provider>
    </QueryClientProvider>
    </ChakraProvider>
    )
}

export default MyApp
