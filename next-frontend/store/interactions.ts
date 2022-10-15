

export const sendIPFSInfo = async(tokenURI:string, id:string)=>{
    const uri = process.env.NEXT_PUBLIC_ENV === "development" ? "http://localhost:3002/web3/items" : "/web3/items"
    const data = JSON.stringify({tokenURI, id});
    await fetch(uri,{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        },
        body:data})
        .then(res => console.log(res))
        .catch(err=>console.error(err));
}

export const fetchAllItems = async ()=>{
    const uri = process.env.NEXT_PUBLIC_ENV === "development" ? "http://localhost:3002/web3/items" : "/web3/items"
    let res = await fetch(uri,{
        method:"GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        }
    })

    let resText = res.text()
   let resJson = JSON.parse(await resText)
   return resJson
}

export const fetchAllUsers = async()=>{
    const uri = process.env.NEXT_PUBLIC_ENV === "development" ? "http://localhost:3002/web3/users" : "/web3/users"
    let res = await fetch(uri,{
        method:"GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        }
    })

    let resText = res.text()
   let resJson = JSON.parse(await resText)
   console.log(resJson)
   return resJson
}