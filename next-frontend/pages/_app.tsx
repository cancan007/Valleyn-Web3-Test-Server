import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from "next/link"

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
        </div>
      </nav>
      <Component {...pageProps} />
    </div>)
}

export default MyApp
