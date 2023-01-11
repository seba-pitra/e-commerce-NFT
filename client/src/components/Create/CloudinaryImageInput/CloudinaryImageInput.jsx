import { useEffect, useRef } from "react";
import styles from "../stylesheets/DarkCreate.module.css";

export default function CloudinaryImageInput({ setImage }) {
  // cloudinary >>>
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dwyhztlkw",
        uploadPreset: "non_fungible_town",
      },
      function (error, result) {
        if (result.info.files) {
          const urlImg = result.info.files[0].uploadInfo.secure_url;
          setImage((prev) => ({
            ...prev,
            image: urlImg,
          }));
        }
      }
    );
  }, []);

  let handleUpload = (e) => {
    e.preventDefault();
    widgetRef.current.open();
  };
  return (
    <>
      <h5>Image, video, audio or 3D model</h5>
      <p>
        <br />
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
        <br /> WAV, OGG, GLB, GLTF. Max size: 100 MB
      </p>
      <span className={styles["error-message"]}>You must to add a file</span>
      <button
        className={styles["upload-file"]}
        onClick={(e) => handleUpload(e)}
      >
        Upload
      </button>
    </>
  );
}
