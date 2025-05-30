import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type DataType = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: string;
};

export default function VanDetail() {
  const [data, setData] = useState<DataType | null>(null);
  const params = useParams();
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    const axiosElements = async () => {
      try {
        const res = await axios.get(`/api/vans/${params.id}`);
        setData(res.data.vans);
      } catch (error) {
        console.error("حصل خطأ:", error);
      }
    };
    axiosElements();
  }, [params.id]);

  const vanDetail = (
    <div className="van-title">
      <img src={data?.imageUrl} alt="" />
      <div className="van-info">
        <h3>{data?.name}</h3>
        <p>
          ${data?.price}
          <span>/day</span>
        </p>
      </div>
      <i className={`van-type ${data?.type} selected`}>{data?.type}</i>
    </div>
  );

  if (!data) return <h2>جاري التحميل...</h2>;

  return (
    <>
      <Link
        to={`..${location.state.search ? location.state.search : null}`}
        className="back-button"
        relative="path"
      >
        <span>
          Back to {location.state.type ? location.state.type : "all vans"}
        </span>
      </Link>

      {vanDetail}
    </>
  );
}
