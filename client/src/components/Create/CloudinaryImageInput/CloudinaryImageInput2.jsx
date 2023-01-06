import { useEffect, useRef } from "react";

export default function CloudinaryImageInput({setImage, image_prop}){
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dwyhztlkw",
      uploadPreset: "non_fungible_town",
    },
    function (error, result) {
      if (result.info.files) {
      const urlImg = result.info.files[0].uploadInfo.secure_url;
        setImage((prev) => ({
            ...prev, 
            [image_prop]: urlImg 
        }));
      }
    });
  }, []);

  let handleUpload = (e) => {
      e.preventDefault();
      widgetRef.current.open();
  };

  return (
    <>
      <button className="upload-file" onClick={(e) => handleUpload(e)}> Upload </button>
    </>
  )
}