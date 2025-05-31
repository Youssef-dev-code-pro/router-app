import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

type Van = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description: string;
};

export default function Vans() {
  const [vans, setVans] = useState<Van[]>([]);
  const [SearchParams, setSearchParams] = useSearchParams();

  const filterType = SearchParams.get("type");

  useEffect(() => {
    const fetchFireBase = async () => {
      console.log("بدء جلب الفانز من فايرستور...");
      try {
        const res = await axios("api/vans");
        setVans(res.data.vans);
      } catch (error) {
        console.log("في مشكلة في جلب البيانات:", error);
      }
    };
    fetchFireBase();
  }, []);

  const vanTypes = filterType
    ? vans.filter((van) => van.type === filterType)
    : vans;

  const vanElements = vanTypes.map((van, index) => (
    <div key={index} className="van-title">
      <Link
        to={`${van.id}`}
        state={{ search: `?${SearchParams.toString()}`, type: filterType }}
      >
        <img src={van.imageUrl} alt="" />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleSearchParams(key: string, value: string | null) {
    setSearchParams((prev) => {
      if (value === null) {
        prev.delete(key);
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  }

  return (
    <div className="van-list-container">
      <div className="buttons">
        <button
          onClick={() => handleSearchParams("type", "simple")}
          className={`van-type simple selected`}
        >
          simple
        </button>
        <button
          onClick={() => handleSearchParams("type", "luxury")}
          className={`van-type luxury selected`}
        >
          luxury
        </button>
        <button
          onClick={() => handleSearchParams("type", "rugged")}
          className={`van-type rugged selected`}
        >
          rugged
        </button>
        <button
          onClick={() => handleSearchParams("type", null)}
          className="van-type clear-filters"
        >
          clear
        </button>
      </div>

      <h1>Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
