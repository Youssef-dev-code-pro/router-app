import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type ListedVansId = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description: string;
  hostId: string;
};

export default function useListedVansId(): {
  data: ListedVansId | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<ListedVansId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/vans/${params.id}`);
        setData(res.data.vans);
      } catch (error) {
        setError("حدث خطأ");
        console.log("axios error", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [params.id]);

  return { data, loading, error };
}
