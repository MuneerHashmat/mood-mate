import React, { useContext } from "react";
import MainContext from "../context/MainContext";
import { weatherEmojis } from "../utils/constants";

const AllNotes = () => {
  const { notes } = useContext(MainContext);
  return (
    <div className="mt-7 w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] mx-auto">
      <div className="">
        <div className="bg-white/60 text-black p-2 shadow-md rounded-md w-fit mx-auto text-xl">
          All Notes
        </div>
      </div>

      {notes.length == 0 ? (
        <h1 className="bg-white/60 mt-5 font-semibold text-center rounded-md p-2">
          Looks like you haven't created any notes yet🤷‍♂️.......
        </h1>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {notes.map((note) => (
            <div
              className="bg-white/60 rounded-md p-2 flex flex-col justify-between gap-3"
              key={note.id}
            >
              <div className="flex gap-2">
                <p className="text-4xl">{note.mood.emoji}</p>
                <p>{note.text}</p>
              </div>

              <div className="flex gap-2 justify-between text-xs">
                <p>{note.date},{" "}{note.time}</p>
                <p>{weatherEmojis[note.weather.condition]}{" "}{note.weather.temp}°C</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNotes;
