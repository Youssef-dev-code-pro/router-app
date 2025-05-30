import  useOutletContext  from "./HostVansHook";

export default function Pricing() {
  const { data, loading, error } = useOutletContext();

  if (loading) return <h2>جار التحميل...</h2>;
  if (error) return <h2>فيه مشكلة: {error}</h2>;
  if (!data) return <h2>مفيش بيانات</h2>;

  return (
    <h3 className="host-van-price">
      ${data.price}
      <span>/day</span>
    </h3>
  );
}
