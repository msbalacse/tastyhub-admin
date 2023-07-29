import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useState, useEffect, useRef } from "react";
import { db } from "../firebase";

const ApiDataContext = createContext();

const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [reload, setReload] = useState(false);
  const dataRef = useRef(collection(db, "products"));

  useEffect(() => {
    fetchData();
    console.log("---");
  }, [reload]);

  async function fetchData() {
    const data = await getDocs(dataRef.current);
    try {
      setApiData(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  }

  return (
    <ApiDataContext.Provider value={{ apiData, fetchData, setReload, reload }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export { ApiDataContext, ApiDataProvider };
