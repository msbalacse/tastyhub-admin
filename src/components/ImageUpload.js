import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";

const ImagwUpload = () => {
  const [textData, setTextData] = useState("");
  const [file, setFile] = useState(null);

  //   // Your Firebase configuration
  //   const firebaseConfig = {
  //     // Your Firebase config here
  //   };

  //   // Initialize Firebase app and modules
  //   const storage = getStorage(firebaseConfig);
  //   const db = getFirestore(firebaseConfig);

  // Function to upload a file to Firebase Storage and get the download URL
  async function uploadImageFile(file, filename) {
    try {
      const storageRef = ref(storage, `image/${filename}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    // Upload the file and get the download URL
    const filename = file.name;
    const downloadURL = await uploadImageFile(file, filename);

    // Combine text data with the file URL
    const combinedData = {
      text: textData,
      imageURL: downloadURL,
    };

    // Store the combined data in the Firestore database
    try {
      const dataRef = collection(db, "product");
      await addDoc(dataRef, combinedData);

      console.log("Data with file uploaded successfully.");
      setTextData("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading data with file:", error);
    }
  }

  return (
    <div>
      <h2>Upload Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Text Data:</label>
          <textarea
            value={textData}
            onChange={(e) => setTextData(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImagwUpload;
