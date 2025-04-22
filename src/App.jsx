import { Toaster } from "react-hot-toast"
import AddNote from "./components/AddNote"
import AllNotes from "./components/AllNotes"


function App() {
 

  return (
    <>
    <Toaster />
      <div className="w-sceen min-h-screen gradient-bg pt-10 pb-5">
        <AddNote />
        <AllNotes />
      </div>
    </>
  )
}

export default App
