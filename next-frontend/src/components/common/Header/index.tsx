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
        <nav className='border-b'>
          <Box className="flex flex-row w-full justify-between p-5">
        <p className="text-4xl font-bold">Valleyin Auction</p>
        <IconContext.Provider value={{size: '35px'}}>
          <AiOutlineAlignCenter onClick={() => switchNav()} className=" sm:hidden"/>
        </IconContext.Provider>
        </Box>
        <Box className="flex flex-col">
        <div className='hidden sm:flex flex-row justify-start w-full mt-4'>
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
          <Box className="flex flex-row w-1/2 justify-end justify-self-end px-3">
          <Text onClick={() => logout()} className="text-blue-500 hover:text-blue-200 cursor-pointer">Logout</Text>
          </Box>
        </div>
        
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