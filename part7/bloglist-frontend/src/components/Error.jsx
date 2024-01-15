import { useSelector } from "react-redux";

const Error = (props) => {
  const mes = useSelector((state) => state.notification);

  if (mes === "") return null;
  return <div className="error">{mes}</div>;
};

export default Error;
