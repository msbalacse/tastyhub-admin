import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../UploadProducts/UploadProducts.css";

const Notifications = () => {
  const [NotificationName, setNotificationName] = useState();
  const [Details, setDetails] = useState();
  const [Duration, setDuration] = useState();
  const [Banner, setBanner] = useState(null);
  const [Discount, setDiscount] = useState();

  const navigation = useNavigate();

  const date = new Date();

  const timestamp = `${date.getDate()} ${
    date.getMonth() > 10 ? `${date.getMonth()}` : `0${date.getMonth()}`
  } ${date.getFullYear()}`;

  async function uploadFile(image, imagename) {
    try {
      const storageRef = ref(storage, `notification/${imagename} ${timestamp}`);
      console.log(`notification/${imagename} ${timestamp}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (err) {
      console.error("file upload error" + err);
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const BannerImageName = Banner.name;

    const downloadUrl = await uploadFile(Banner, BannerImageName);

    const combineData = {
      NotificationName,
      Duration,
      Details,
      Discount,
      imageUrl: downloadUrl,
      date: date.toLocaleString(),
    };

    const dataRef = collection(db, "notifications");
    await addDoc(dataRef, combineData).then(() => {
      console.log("Notification added successfully");
    });
    navigation("/");
  }

  return (
    <div className="main">
      <h1>Notifications</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input__control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={NotificationName}
            onChange={(e) => setNotificationName(e.target.value)}
          />
        </div>

        <div className="input__control">
          <label htmlFor="name">Details</label>
          <input
            type="text"
            name="details"
            value={Details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className="input__control">
          <label htmlFor="name">Duration</label>
          <input
            type="text"
            name="duration"
            value={Duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="input__control">
          <label htmlFor="name">Discount</label>
          <input
            type="text"
            name="discount"
            value={Discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="input__control">
          <label htmlFor="banner">Banner</label>
          <input
            type="file"
            name="banner"
            onChange={(e) => setBanner(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Notifications;
