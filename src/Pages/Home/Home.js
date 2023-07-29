import React, { useContext, useEffect } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";
import "./Home.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
  const { apiData, fetchData } = useContext(ApiDataContext);

  useEffect(() => {
    fetchData();
    console.log("fetch data ----");
    console.log(apiData);
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Admin Dashboard</h1>

      <div className="productCount">Total Products : {apiData.length}</div>
      <div className="products">
        {apiData.map((data) => (
          <ProductCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Home;
