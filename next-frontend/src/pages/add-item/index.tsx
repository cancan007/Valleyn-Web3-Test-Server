/* eslint-disable react/no-unescaped-entities */
import { Button } from "@chakra-ui/react";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import ipfs from "ipfs-http-client";
import { create as ipfsHttpClient} from "ipfs-http-client"  // to connect IPFS
import { useRouter } from "next/router";
import {useCallback, useEffect, useMemo, useState} from "react";
import { useDropzone } from "react-dropzone";
import { useAPIPostTokenUriAndId } from "src/hooks/api/add-item/useAPIPostTokenUriAndId";
import { useAppSelector } from "src/hooks/useGeneral";
import { IconContext } from 'react-icons';
import {FcAddImage} from "react-icons/fc" 

//const client = ipfsHttpClient("/ip4/127.0.0.1/tcp/5002")
const client = ipfsHttpClient("/ip4/127.0.0.1/tcp/5001");

type InfoType = {
    //image?:string;
    images:Array<string>;
    name?:string;
    description?:string;
}

export const AddItemPage = () => {
    const [file, setFile] = useState<File>();
    const [images, setImages] = useState<any>([]);
    const [info, setInfo] = useState<InfoType & any>({images:[]});
    const [id, setId] = useState<string>();
    const router = useRouter();
    const auth = useAppSelector(state => state.auth);
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({multiple: true, accept:{"image/*":[".png", ".jpeg", ".jpg", ".svg"]}});

    const postTokenUriAndUserId = useAPIPostTokenUriAndId({
        onSuccess:(result)=>{
            alert('Succeeded to create NFT item')
            setInfo({images:[], name:undefined, description:undefined});
            //setFile(undefined)
            router.push({pathname:"/my-items"})
        }
    })

    const upload = async()=>{
        //await addFile();
        if(!info || info.images.length === 0 || !info.name || !info.description || !id){
            alert("Fill all forms")
            return;
        }
        const infoJson = JSON.stringify(info);
        const data = await client.add(infoJson);
        const url = `https://ipfs.io/ipfs/${data.cid}`;
        //console.log(url)
        postTokenUriAndUserId.mutate({tokenURI:url, id})
        //await sendIPFSInfo(url, id)
    }

    const addImagesToIpfs = async() => {
        if(acceptedFiles.length === 0){
            alert("Please add item images");
            return
        }
        const ipfsImages: Array<string> = []
        for(let i=0; i < acceptedFiles.length; i++) {
            let res = await client.add({content: acceptedFiles[i]});
            let url = `https://ipfs.io/ipfs/${res.cid}`;
            ipfsImages.push(url);
            console.log(url);
            //setInfo((prevState:any) => ({...prevState, images: [...prevState.images, url]}))
        }
        setInfo((prevState:any) => ({...prevState, images: ipfsImages}));
        alert(`Succeeded to add ${acceptedFiles.length + 1} images to IPFS`);
    }

    const readImage = ()=>{
        if(acceptedFiles.length === 0) return;
        for(let i=0; i < acceptedFiles.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImages((prevState: any)=>[
                    ...prevState,
                    {src:reader.result}
                ])
            }
            reader.readAsDataURL(acceptedFiles[i])
        }
    }

    
    useEffect(()=>{ 
        readImage()
    },[acceptedFiles])

    useEffect(()=>{
        setId(auth.id);
    },[auth.id])
    
    if(!auth.name && router.isReady){
        router.push({pathname:"/login"});
        return(<></>)
    }else if(!router.isReady){
        return(<></>)
    }else {

  return (
    <div className="body w-screen">
    <header>

    </header>
    <section className="flex flex-col items-center justify-center w-full h-4/5">
      <div className="mt-10 w-full sm:w-1/2 h-[200px] rounded-lg border-2 border-gray-500 relative overflow-auto flex flex-cols justify-center items-center" {...getRootProps()}>
        <IconContext.Provider value={{className: "absolute -z-10 w-full ", size:"2em"}}>
          <FcAddImage/>
        </IconContext.Provider>
        <input className="w-full h-full" {...getInputProps()} />
        <div className="absolute top-0 left-0 -z-10 grid grid-cols-3 sm:grid-cols-4 gap-1">
        {images.length > 0 && (
        images.map((image:any, i:number)=>(
            <img className="w-[200px] aspect-[4/3] object-cover" key={i} src={image.src}/>
        ))
      )}
        </div>
      </div>
      <Button onClick={() => addImagesToIpfs()} className="my-2" colorScheme='blue' variant='outline'>Add Images</Button>
      <div className="flex flex-col items-center justify-center gap-y-4">
      
      <input value={auth.id} onChange={(e:any)=>setId(e.target.value)} className="px-2 py-1" type="text" placeholder="Your ID"/>
      <input onChange={(e:any)=>setInfo({...info, name:e.target.value})} className="px-2 py-1" type="text" placeholder="title"/>
      <input onChange={(e:any)=>setInfo({...info, description:e.target.value})} className="px-2 py-1" type="text" placeholder="description"/>
      <button onClick={()=>upload()} className="border-2 rounded-lg px-3 py-1 text-white bg-blue-500 hover:bg-blue-300">Upload</button>
      </div>
    </section>
   </div>
  )
        }
}

export default AddItemPage;
