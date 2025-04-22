import { Toaster } from "react-hot-toast"
import AddNote from "./components/AddNote"
import WeatherWidget from "./components/WeatherWidget"


function App() {
 

  return (
    <>
    <Toaster />
      <div className="w-sceen min-h-screen gradient-bg pt-10">
        <AddNote />
      </div>
    </>
  )
}

export default App
