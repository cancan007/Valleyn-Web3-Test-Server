

import React, { useEffect, useState } from 'react'
import { ItemOrganizedType, useAPIGetAllitems } from 'src/hooks/api/admin/useAPIGetAllitems'
import { useAPIGetAllUsers } from 'src/hooks/api/admin/useAPIGetAllUsers'
import { fetchAllUsers } from '../../store/interactions'

export const Admin = () => {
  const [users, setUsers] = useState<Array<any>>()

  const {data:gettingAllUsers, refetch:refetchAllUsers} = useAPIGetAllUsers()
  const {data:gettingAllitems, refetch:refetchAllitems} = useAPIGetAllitems()


  useEffect(()=>{
    refetchAllUsers()
    refetchAllitems()
  },[gettingAllUsers,gettingAllitems])

  return (
    <div>
      <header>

      </header>
      <section className="flex flex-col items-center w-screen">
        <div className="flex flex-col w-4/5">
          <p className="text-xl">All Users</p>
          {gettingAllUsers && gettingAllUsers.map((user:any, i:number)=>(
            <div key={i} className="flex flex-col w-full mt-2 border-2 border-gray-400">
               <div className="flex flex-row w-full">
                <div className="bg-gray-400 w-1/4">
                  <p className="text-white text-center">name</p>
                </div>
                <p>{user.name}</p>
              </div>
              <hr/>
              <div className="flex flex-row w-full">
                <div className="bg-gray-400 w-1/4">
                  <p className="text-white text-center">ID</p>
                </div>
                <p className="text-sm">{user.userId}</p>
              </div>
            </div>
          ))}
        
        </div>
        <div className='flex flex-col w-4/5'>
          <p className="text-xl">All Items</p>
          <div className="w-full grid grid-cols-3">
            {gettingAllitems && gettingAllitems.map((item:ItemOrganizedType, i:number)=>{
              /*let num = i+1;
              const col = i%3;
              const row = Math.floor(i/3);*/
              return(<div key={i} className="rounded-lg border-2 border-col-gray-500 flex flex-col items-center justify-center">
                       <img src={item.image} className="object-cover rounded-t-lg"/>
                       <p className="text-xl">{item.title}</p>
                       <p>description:{item.description}</p>
                       <p>IC: {item.ic.slice(0, 6) + '...' + item.ic.slice(38, 42)}</p>
                       <p>Owner:{item.name}</p>
                       <p className="">OwnerID: {item.ownerId.slice(0, 6) + '...' + item.ownerId.slice(38, 42)}</p>
                     </div>)
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admin;
