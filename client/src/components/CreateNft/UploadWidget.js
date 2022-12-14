import { Button, Divider } from '@material-ui/core';
import {useEffect,useRef} from 'react';

const UploadWidget = () =>{
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current)
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:'dwyhztlkw',
            uploadPreset:'non_fungible_town'
        },function(error,result){
            console.log(result)
        })
    },[])
    let handleUpload = (e) =>{
        e.preventDefault()
        widgetRef.current.open()
    }
    return(
        <button onClick={(e)=> handleUpload(e)}>
            Upload
        </button>
    )
}

export default UploadWidget;