import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import MainContext from "./MainContext";

const MainProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const initialState=JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, setNotes]=useState(initialState);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      console.log(data);
      
      setWeather({
        temp: Math.round(data.main.temp),
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        condition: data.weather[0].main,
        city: data.name,
      });
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNote=(note)=>{
    setNotes([...notes,note]);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        //Default to Delhi if location permission denied
        fetchWeather(28.6139, 77.209);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes])


  return (
    <MainContext.Provider value={{ loading, weather, currentTime, notes, addNote }}>
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export default MainProvider;
