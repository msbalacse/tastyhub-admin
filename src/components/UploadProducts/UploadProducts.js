import React, { useState } from "react";
import "./UploadProducts.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const UploadProducts = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const date = new Date();

  const timestamp = `${date.getDate()} ${
    date.getMonth() > 10 ? `${date.getMonth()}` : `0${date.getMonth()}`
  } ${date.getFullYear()}`;

  async function uploadFile(file, filename) {
    try {
      const storageRef = ref(storage, `images/${filename} ${timestamp}`);
      console.log(`images/${filename} ${timestamp}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (err) {
      console.error("file upload error" + err);
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const filename = file.name;

    const downloadUrl = await uploadFile(file, filename);

    const combineData = {
      text: name,
      imageUrl: downloadUrl,
    };

    try {
      const dataRef = collection(db, "product");
      await addDoc(dataRef, combineData);
      console.log("file uploaded successfully");
    } catch (err) {
      console.log("firestore upload failed: " + err);
    }
  }

  return (
    <div>
      <h1>UploadProducts</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input__control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input__control">
          <label htmlFor="imaga">image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default UploadProducts;
