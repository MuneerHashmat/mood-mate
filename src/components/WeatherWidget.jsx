import { useContext } from "react";
import MainContext from "../context/MainContext";

const WeatherWidget = () => {
  const { loading, weather } = useContext(MainContext);

  if (loading || !weather)
    return (
      <div>
        <img src="/spinner2.svg" alt="loader" className="w-[60px] h-[60px]" />
      </div>
    );
  return (
    <div className="p-2 text-black bg-white/30 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex gap-1 items-center">
        <img src="/location.png" alt="loc" className="w-[12px] h-[12px]" />
        <p className="text-[15px]">{weather.city}</p>
      </div>

      <div className="flex items-center">
        <img
          src={weather.icon}
          alt={weather.condition}
          className="w-[30px] h-[30px]"
        />
        <p className="text-md font-semibold">{weather.temp}°C</p>
        <p className="text-[12px] px-2">{weather.condition}</p>
      </div>
      <div></div>
    </div>
  );
};

export default WeatherWidget;
