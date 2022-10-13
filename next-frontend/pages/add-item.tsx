/* eslint-disable react/no-unescaped-entities */
import ipfs from "ipfs-http-client";
import { create as ipfsHttpClient } from "ipfs-http-client"  // to connect IPFS
import {useState} from "react";
import { useDropzone } from "react-dropzone";

const client = ipfsHttpClient("/ip4/127.0.0.1/tcp/5002")

export const AddItemPage = () => {
    //const [files, setFiles] = useState();
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
        return result
    }

  return (
    <div className="body w-screen">
    <header>

    </header>
    <section className="flex flex-col items-center justify-center w-full">
      <div className="mt-10 w-[300px] h-[300px] rounded-full bg-gray-400" {...getRootProps()}>
      <input {...getInputProps()} />
      </div>
      <p className="text-blue-500">Please drag your files here</p>
      <button onClick={()=>addItemToIpfs()} className="border-2 rounded-lg px-3 py-1 text-white bg-blue-500 hover:bg-blue-300">Upload</button>
      <ul>
      {files}
      </ul>
    </section>
   </div>
  )
}

export default AddItemPage;
