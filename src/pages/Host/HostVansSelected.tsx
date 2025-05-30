import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

type VanType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description: string;
  hostId: string;
};

export default function ListedVansComponent() {
  const params = useParams();
  const [data, setData] = useState<VanType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const axiosCall = async () => {
      try {
        const res = await axios.get(`/api/vans/${params.id}`);
        setData(res.data.vans);
      } catch {
        setError(true);
      }
    };
    axiosCall();
  }, [params.id]);

  if (error) return <h2>حصل خطأ 😓</h2>;
  if (!data) return <h2>بيحمّل ... ⏳</h2>;

  return (
    <>
      <Link to=".." className="back-button" relative="path">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail">
        <img src={data?.imageUrl} alt="" />
        <div className="host-van-detail-info-text">
          <i className={`van-type ${data?.type} selected`}>{data?.type}</i>
          <h3>{data?.name}</h3>
          <h4>${data?.price}/day</h4>
        </div>
      </div>
    </>
  );
}
