import React from "react";
import WeatherWidget from "./WeatherWidget";

const AddNote = () => {
  return (
    <div className="w-[90vw] mx-auto glassmorphism p-4 flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex gap-1">
            <img src="/emotion.png" alt="logo" className="w-[30px] h-[30px]" />
            <h1 className="text-xl font-semibold text-black">MoodMate</h1>
        </div>
        <WeatherWidget />
      </div>
    </div>
  );
};

export default AddNote;
