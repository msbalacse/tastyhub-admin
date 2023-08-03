import React, { useState } from "react";
import "./UploadProducts.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UploadProducts = () => {
  const navigation = useNavigate();
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [productImage, setProductImage] = useState(null);

  const date = new Date();

  const timestamp = `${date.getDate()} ${
    date.getMonth() > 10 ? `${date.getMonth()}` : `0${date.getMonth()}`
  } ${date.getFullYear()}`;

  async function uploadFile(image, imagename) {
    try {
      const storageRef = ref(
        storage,
        `product_images/${imagename} ${timestamp}`
      );
      console.log(`images/${imagename} ${timestamp}`);
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

    const productImageName = productImage.name;

    const downloadUrl = await uploadFile(productImage, productImageName);

    const combineData = {
      productId,
      productName,
      category,
      price,
      details,
      imageUrl: downloadUrl,
      date: date.toLocaleString(),
    };

    const dataRef = collection(db, "products");
    await addDoc(dataRef, combineData).then(() => {
      console.log("Added product");
    });
    navigation("/");
  }

  return (
    <div className="main">
      <h1>New Product</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input__control">
          <label htmlFor="name">Product Id</label>
          <input
            type="number"
            name="product_id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div className="input__control">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value.toLowerCase())}
            required
          />
        </div>
        <div className="input__control">
          <label htmlFor="name">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
            name="category"
            id="category"
            className="p-2"
            required
          >
            <option value=""></option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non Veg</option>
            <option value="drinks">Drinks</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="input__control">
          <label htmlFor="name">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input__control">
          <label htmlFor="name">Details</label>
          <input
            type="text"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div className="input__control">
          <label htmlFor="imaga">Product Image</label>
          <input
            type="file"
            name="product_image"
            id="image"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="submit__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadProducts;
