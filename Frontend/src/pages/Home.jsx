import React, { useEffect, useState } from "react";
import Slidebar from "../components/Slidebar";
import Card from "../components/Card";

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [searchData, setSearchData] = useState("");

  const loadData = async () => {
    let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  const loadSearchData = (data)=>{
    setSearchData(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Slidebar searchData={searchData} setSearchData={loadSearchData}/>
      <div>
        {foodCategory.map((data) => (
          <div key={data._id} className="p-2 mb-4">
            <h2 className="font-bold text-lg mb-2">{data.CategoryName}</h2>
            <div className="flex space-x-4 overflow-x-scroll overflow-y-hidden scroll-container">
              {foodItem
                .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchData.toLowerCase())))
                .map((item) => (
                  <Card
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    img={item.img}
                    options={item.options[0]}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
