import { Box, List, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import Link from "next/link"
import { useCallback, useEffect, useRef } from "react";
import { deleteAuth } from "src/hooks/authenticate/useAuthInteractions";
import { useAppDispatch } from "src/hooks/useGeneral"
import {AiOutlineAlignCenter} from "react-icons/ai"
import { IconContext } from "react-icons";

export const Header = () => {
  const navRef = useRef(null);
  const switchNav = useCallback(() => {
    if(navRef?.current?.className === "flex flex-col items-center bg-gray-500 sm:hidden rounded-b-lg text-white"){
      navRef.current.className = "flex-col items-center bg-gray-500 sm:hidden rounded-b-lg text-white hidden";
    } else {
      navRef.current.className = "flex flex-col items-center bg-gray-500 sm:hidden rounded-b-lg text-white"
    }
  },[])
  const dispatch = useAppDispatch();
  
  const logout = () => {
    deleteAuth(dispatch);
  };

    return (
        <nav className='border-b bg-gray-500 h-[100px]'>
          <Box className="flex flex-row w-full justify-between p-5">
            <p className="text-4xl font-bold">Valleyin Auction</p>
            <div className='hidden lg:flex flex-row justify-end items-center w-3/5 mt-4 px-5 text-base lg:text-xl font-semibold divide-x'>
              <Box className="flex flex-row justify-center w-1/6">
              <Link href="/">
                <a className=' text-pink-500 hover:text-pink-200 cursor-pointer'>
                  Home
                </a>
              </Link>
              </Box>
              <Box className="flex flex-row justify-center w-1/6">
              <Link className="" href="/add-item">
                <a className='text-pink-500 hover:text-pink-200 cursor-pointer'>
                  Add Item
                </a>
              </Link>
              </Box>
              <Box className="flex flex-row justify-center w-1/6">
              <Link href="/my-items">
                <a className=' text-pink-500 hover:text-pink-200 cursor-pointer'>
                  My Items
                </a>
              </Link>
              </Box>
              <Box className="flex flex-row justify-center w-1/6">
              <Link href="/admin">
              <a className=' text-pink-500 hover:text-pink-200 cursor-pointer'>
                Admin
              </a>
              </Link>
              </Box>
              <Box className="flex flex-row justify-center w-1/6">
              <Text onClick={() => logout()} className="text-blue-500 hover:text-blue-200 cursor-pointer">Logout</Text>
              </Box>
            </div>
        <IconContext.Provider value={{size: '35px'}}>
          <AiOutlineAlignCenter onClick={() => switchNav()} className=" lg:hidden"/>
        </IconContext.Provider>
        </Box>
        <Box className="flex flex-col">
        
        
        <Box ref={navRef} className="flex flex-col items-center bg-gray-500 sm:hidden rounded-b-lg text-white hidden">
          <List className="flex flex-col items-center w-screen">
            <Link href="/">
              <a >Home</a>
            </Link>
            <Link href="/add-item">
              <a >Add Item</a>
            </Link>
            <Link href="/my-items">
              <a >My Items</a>
            </Link>
            <Link href="/admin">
              <a >Admin</a>
            </Link>
            <ListItem>
              <Text className="text-red-500 hover:text-red-200" onClick={() => logout()}>Logout</Text>
            </ListItem>
          </List>
        </Box>
        </Box>
      </nav>
    )
}