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
  let intervalId;

  const fetchUpdatedWeather = (lat, lon) => {
    fetchWeather(lat, lon); 

    intervalId = setInterval(() => {
      fetchWeather(lat, lon);
    }, 600000);
  };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchUpdatedWeather(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        //Default to Delhi if location permission denied
        fetchUpdatedWeather(28.6139, 77.209);
      }
    );

    return ()=> clearInterval(intervalId);
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
