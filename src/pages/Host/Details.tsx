import useOutletContext from "./HostVansHook";

export default function Details() {
  const { data, loading, error } = useOutletContext();

  if (loading) return <h2>جار التحميل...</h2>;
  if (error) return <h2>فيه مشكلة: {error}</h2>;
  if (!data) return <h2>مفيش بيانات</h2>;

  return (
    <section className="host-van-detail-info">
      <h4>
        Name: <span>{data.name}</span>
      </h4>
      <h4>
        Category: <span>{data.type}</span>
      </h4>
      <h4>
        Description: <span>{data.description}</span>
      </h4>
      <h4>
        Visibility: <span>Public</span>
      </h4>
    </section>
  );
}
