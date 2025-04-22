import React, { useContext, useState } from "react";
import WeatherWidget from "./WeatherWidget";
import LiveClock from "./LiveClock";
import { moods } from "../utils/constants";
import MainContext from "../context/MainContext";
import toast from "react-hot-toast";

const AddNote = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [textInput, setTextInput]=useState("");
  const {weather, currentTime, addNote}=useContext(MainContext);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!textInput){
      toast.error("Please add a note");
      return;
    }
    if(!currentMood){
      toast.error("Please select a mood");
      return;
    }

    const formattedDate=currentTime.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newNote={
      id: crypto.randomUUID(),
      mood: currentMood,
      text: textInput,
      weather: weather,
      date: formattedDate,
      time: formattedTime
    }

    addNote(newNote);

    setCurrentMood(null);
    setTextInput("")
  }
  return (
    <div className="w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] mx-auto glassmorphism p-4 flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <img src="/emotion.png" alt="logo" className="w-[25px] h-[25px]" />
          <h1 className="text-xl font-semibold text-black">MoodMate</h1>
        </div>
        <WeatherWidget />
      </div>

      <div className="text-black w-full p-4 bg-[#ffe4bf] rounded-lg">
        <div className="w-full flex justify-between">
          <div className="w-[60%]">
            <h1 className="font-semibold text-lg lg:text-xl">
              How are you feeling today?
            </h1>
            <div className="mt-2 flex gap-1">
              {moods.map((mood) => (
                <button
                  onClick={() => setCurrentMood(mood)}
                  className="text-3xl lg:text-4xl hover:cursor-pointer hover:scale-[1.01]"
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>
          <LiveClock />
        </div>
        <div className="mt-4 w-full">
          <form
          onSubmit={handleSubmit}
          >
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 items-center">
                <p>Mood</p>
                <div className="w-[60px] h-[60px] glassmorphism relative">
                  {currentMood && (
                    <h1 className="text-[40px] absolute top-[0.5px] left-[1.5px]">{currentMood.emoji}</h1>
                  )}
                </div>
              </div>
              <textarea 
              placeholder="Add a note..."
              value={textInput}
              onChange={(e)=>setTextInput(e.target.value)}
              className="w-full p-2 border-2 rounded-lg bg-white border-yellow-200 outline-none text-md md:text-lg"></textarea>
            </div>
            <button className="bg-[#ff5c5c] p-2 mt-5 rounded-md text-white hover:cursor-pointer hover:scale-[1.01]">Save Note</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
