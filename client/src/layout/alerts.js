import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { removeAlert } from "../redux/actions/alert";

function Alert(props) {
  const dispatch = useDispatch();
  const [downloadTimer, setDownloadTimer] = useState(
    (props.alert.timeout - 1000) / 1000
  );
  useEffect(() => {
    const interval = setInterval(() => {
      if (downloadTimer >= 0) {
        setDownloadTimer(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props.alert.timeout, downloadTimer]);

  return (
    <div
      className={`flex ${
        downloadTimer < 1 ? "slide-out" : "slide-in"
      } bg-main-100 my-1 items-center w-full h-12 p-3 text-gray-100 relative`}>
      <h2 className="font-mono text-xs text-gray-100">{props.alert.message}</h2>
      <div
        className={`h-2 transition-all ease-in-out duration-1000 w-full absolute bottom-0 appearance-none left-0 right-0 ${
          props.alert.status === "error" ? " bg-red-300" : "bg-green-300"
        } `}
        style={{ width: `${downloadTimer * 10}%` }}
        id={`progressBar-${props.alert.id}`}
        value={downloadTimer}></div>
      <div
        className="absolute text-sm text-gray-100 cursor-pointer top-1 right-1"
        onClick={() => dispatch(removeAlert(props.alert.id))}>
        <MdClose />
      </div>
      {downloadTimer < 9 && (
        <span
          className={`absolute bottom-0 text-xs cursor-pointer right-1 ${
            props.alert.status === "error" ? " text-red-300" : "text-green-300"
          } `}>
          {downloadTimer}
        </span>
      )}
    </div>
  );
}

const Alerts = () => {
  const alertReducer = useSelector(state => state.alertReducer);
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`fixed z-20 overflow-hidden overflow-y-auto top-10 right-3 w-72 ${
        alertReducer.filter(alert => alert.priority === "high").length > 0
          ? ""
          : "hidden"
      }`}>
      {alertReducer.map(alert => (
        <Alert key={alert.id} alert={alert}></Alert>
      ))}
    </div>
  );
};

export default Alerts;
