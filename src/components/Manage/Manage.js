import React, { useContext } from "react";
import "./Manage.css";
import { ApiDataContext } from "../../context/ApiDataContext";
import { AiOutlineDelete } from "react-icons/ai";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Manage = () => {
  const { apiData, reload, setReload } = useContext(ApiDataContext);

  async function handleDelete(id) {
    const document = doc(db, "products", id);
    await deleteDoc(document);
    setReload(!reload);
  }

  return (
    <div className="manage">
      <div className="manage__title">Manage</div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Product ID</th>
              <th>Details</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((data) => (
              <tr key={data.id}>
                <td>
                  <img src={data.imageUrl} alt={data.productName} />
                </td>
                <td>
                  <p>{data.productName}</p>
                </td>
                <td>
                  <p>{data.price}$</p>
                </td>
                <td>
                  <p>{data.productId}</p>
                </td>
                <td>
                  <p>{data.details.substring(0, 20)}...</p>
                </td>
                <td>
                  <p>{data.date.substring(0, 9)}</p>
                </td>
                <td>
                  <div className="icons">
                    <button onClick={() => handleDelete(data.id)}>
                      <AiOutlineDelete size={"22px"} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manage;
