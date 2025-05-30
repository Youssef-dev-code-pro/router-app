import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type dataType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
};

export default function Vans() {
  const [data, setData] = useState<dataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/host/vans");
        setData(res.data.vans);
      } catch (error) {
        console.log("axios error", error);
      }
    };

    getData();
  }, []);

  const myElements = data.map((van, index) => (
    <div key={index} className="host-van-single">
      <Link to={`/host/vans/${van.id}`} className="host-van-link-wrapper">
        <img src={van.imageUrl} alt="image" />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div>
      <h1>Your Listed Vans</h1>
      {myElements}
    </div>
  );
}
