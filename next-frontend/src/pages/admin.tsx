

import React, { useEffect, useState } from 'react'
import { useAPIGetAllUsers } from 'src/hooks/api/admin/useAPIGetAllUsers'
import { fetchAllUsers } from '../../store/interactions'

export const Admin = () => {
  const [users, setUsers] = useState<Array<any>>()

  const {data:gettingAllUsers, refetch} = useAPIGetAllUsers()

  useEffect(()=>{
    refetch()
  },[gettingAllUsers])

  return (
    <div>
      <header>

      </header>
      <section className="flex flex-col items-center w-screen">
        <div className="flex flex-col w-4/5">
          <p className="text-xl">Users</p>
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
        <div className='flex flex-col'>

        </div>
      </section>
    </div>
  )
}

export default Admin;
