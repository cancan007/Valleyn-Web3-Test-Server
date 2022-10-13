/* eslint-disable react/no-unescaped-entities */
import ipfs from "ipfs-http-client";
import { create as ipfsHttpClient } from "ipfs-http-client"  // to connect IPFS
import {useState} from "react";
import { useDropzone } from "react-dropzone";
import { isReadable } from "stream";

const client = ipfsHttpClient("/ip4/127.0.0.1/tcp/5002")

export const AddItemPage = () => {
    const [file, setFile] = useState();
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const files = acceptedFiles.map((file:any, i:number) =>{
        console.log(acceptedFiles)
     return(
        <>
        <li key={i}>{file.path}</li>
        </>
      )});

    const addItemToIpfs = async()=>{
        const result = []
        for await (const resultPart of client.addAll(acceptedFiles)) {
            result.push(resultPart)
        }
        //const url = `https://ipfs.io/ipfs/${added.path}`
        console.log(result);
        console.log(result[0].cid)
        console.log(`https://ipfs.io/ipfs/${result[0].cid}`)
        return result
    }

    const addFile = async()=>{
        if(!file) return;
        const result = await client.add(file)
        console.log(`https://ipfs.io/ipfs/${result.cid}`)
        return result;
    }

  return (
    <div className="body w-screen">
    <header>

    </header>
    <section className="flex flex-col items-center justify-center w-full">
      <div className="mt-10 w-[300px] h-[300px] rounded-full bg-gray-400" {...getRootProps()}>
      <input {...getInputProps()} />
  </div>
      <form>
      <input name="asset" id="asset" onChange={(e:any)=>setFile(e.target.files[0])} type="file" />
      </form>
      <p className="text-blue-500">Please drag your files here</p>
      <button onClick={()=>addFile()} className="border-2 rounded-lg px-3 py-1 text-white bg-blue-500 hover:bg-blue-300">Upload</button>
      <img  src="https://ipfs.io/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn"/>
      <ul>
      {files}
      </ul>
    </section>
   </div>
  )
}

export default AddItemPage;
