/* eslint-disable react/no-unescaped-entities */
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import ipfs from "ipfs-http-client";
import { create as ipfsHttpClient} from "ipfs-http-client"  // to connect IPFS
import {useEffect, useState} from "react";
import { useDropzone } from "react-dropzone";
import { useAPIPostTokenUriAndId } from "src/hooks/api/add-item/useAPIPostTokenUriAndId";
import { isReadable } from "stream";
import { sendIPFSInfo } from "../../store/interactions";

//const client = ipfsHttpClient("/ip4/127.0.0.1/tcp/5002")
const client = ipfsHttpClient("/ip4/127.0.0.1/tcp/5001");

type InfoType = {
    image?:string;
    name?:string;
    description?:string;
}

export const AddItemPage = () => {
    const [file, setFile] = useState();
    const [images, setImages] = useState<any>([]);
    const [info, setInfo] = useState<InfoType & any>();
    const [id, setId] = useState<string>();
    //const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    /*
    const files = acceptedFiles.map((file:any, i:number) =>{
        console.log(acceptedFiles)
     return(
        <>
        <li key={i}>{file.path}</li>
        </>
      )});*/
/*
    const addItemToIpfs = async()=>{
        const result = []
        for (let i:number=0; i < acceptedFiles.length; i++) {
            const added = await client.add(acceptedFiles[i]);
            result.push(added);
            
        }
        //const url = `https://ipfs.io/ipfs/${added.path}`
        console.log(result);
        console.log(result[0].cid)
        console.log(`https://ipfs.io/ipfs/${result[0].cid}`)
        console.log(images)
        return result
    }*/

    const postTokenUriAndUserId = useAPIPostTokenUriAndId({
        onSuccess:(result)=>{
            alert(result)
        }
    })

    const upload = async()=>{
        await addFile();
        if(!info || !info.image || !info.name || !info.description || !id){
            console.log("Fill all forms")
            return;
        }
        const infoJson = JSON.stringify(info);
        const data = await client.add(infoJson);
        const url = `https://ipfs.io/ipfs/${data.cid}`;
        console.log(url)
        postTokenUriAndUserId.mutate({tokenUri:url, id})
        //await sendIPFSInfo(url, id)
    }

    const addFile = async()=>{
        if(!file) return;
        const result = await client.add(file)
        //console.log(`https://ipfs.io/ipfs/${result.cid}`)
        const url = `https://ipfs.io/ipfs/${result.cid}`;
        setInfo((prevState:any)=>({ ...prevState,image:url}));
        return result;
    }

    const readImage = ()=>{
        if(!file) return;
        const reader = new FileReader();
            reader.onloadend = () =>{
                setImages((prevState: any)=>[
                    ...prevState,
                    {src:reader.result}
                ])
            }
            reader.readAsDataURL(file)
    }

    useEffect(()=>{
        readImage()
    },[file])

  return (
    <div className="body w-screen">
    <header>

    </header>
    <section className="flex flex-col items-center justify-center w-full">
      {/*<div className="mt-10 w-[300px] h-[300px] rounded-full bg-gray-400" {...getRootProps()}>
        <input {...getInputProps()} />
  </div>*/}
      
      <input name="asset" id="asset" onChange={(e:any)=>setFile(e.target.files[0])} type="file" />
      {images.length > 0 && (
        images.map((image:any, i:number)=>(
            <img className="w-[200px] h-auto object-cover " key={i} src={image.src}/>
        ))
      )}
      <input onChange={(e:any)=>setId(e.target.value)} type="text" placeholder="Your ID"/>
      <input onChange={(e:any)=>setInfo({...info, name:e.target.value})} type="text" placeholder="name"/>
      <input onChange={(e:any)=>setInfo({...info, description:e.target.value})} type="text" placeholder="description"/>
      <button onClick={()=>upload()} className="border-2 rounded-lg px-3 py-1 text-white bg-blue-500 hover:bg-blue-300">Upload</button>
    </section>
   </div>
  )
}

export default AddItemPage;
