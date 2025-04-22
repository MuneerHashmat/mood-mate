import { useContext } from "react";
import MainContext from "../context/MainContext";


const LiveClock = () => {
  const {currentTime}=useContext(MainContext);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-2 text-black">
      <h1 className="text-xl sm:text-3xl font-bold lg:text-4xl">{formattedTime}</h1>
      <p className="text-sm sm:text-md lg:text-lg font-medium">
        {formattedDate}
      </p>
    </div>
  );
};

export default LiveClock;
