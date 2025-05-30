import useOutletContext from "./HostVansHook";

export default function HostVanPhotos() {
  const { data, loading, error } = useOutletContext();

  if (loading) return <h2>جار التحميل...</h2>;
  if (error) return <h2>فيه مشكلة: {error}</h2>;
  if (!data) return <h2>مفيش بيانات</h2>;

  return (
    <img
      src={data.imageUrl}
      className="host-van-detail-image"
      style={{ maxWidth: "150px", display: "block", margin: "20px auto" }}
    />
  );
}
