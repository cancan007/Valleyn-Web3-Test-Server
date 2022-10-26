
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ItemOrganizedType, useAPIGetAllitems } from 'src/hooks/api/admin/useAPIGetAllitems'
import { useAPIGetAllUsers } from 'src/hooks/api/admin/useAPIGetAllUsers'

export const Admin = () => {
  const [users, setUsers] = useState<Array<any>>()
  const router = useRouter()
  const {data:gettingAllUsers, refetch:refetchAllUsers} = useAPIGetAllUsers()
  const {data:gettingAllitems, refetch:refetchAllitems} = useAPIGetAllitems()

  const handleJumpToItemDetail = (ic:string, item:ItemOrganizedType) =>{
    router.push({
        pathname:`/admin/item/[ic]`,
        query: {ic, owner:item.name, ownerId:item.ownerId, title:item.title, description: item.description, image:item.image, images:item.images}
    })
  }

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
            <div key={i} className="flex flex-col w-full mt-2 border-2 border-gray-400 ">
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
          <div className="w-full grid-cols-1 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {gettingAllitems && gettingAllitems.map((item:ItemOrganizedType, i:number)=>{
              /*let num = i+1;
              const col = i%3;
              const row = Math.floor(i/3);*/
              return(<div key={i} onClick={()=>handleJumpToItemDetail(item.ic,item)} className="rounded-lg border-2 border-col-gray-500 flex flex-col items-center justify-start h-[350px] overflow-y-auto cursor-pointer">
                       <img src={item.image ? item.image : item.images ? item.images[0] : ''} className="object-cover rounded-t-lg h-[200px] w-full"/>
                       <p className="text-xl">{item.title}</p>
                       <p className="text-sm">description:{item.description}</p>
                       <p className="text-sm">IC: {item.ic.slice(0, 6) + '...' + item.ic.slice(38, 42)}</p>
                       <p className="text-sm">Owner:{item.name}</p>
                       <p className="text-sm">OwnerID: {item.ownerId.slice(0, 6) + '...' + item.ownerId.slice(38, 42)}</p>
                     </div>)
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admin;
