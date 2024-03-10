import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/Projects"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/projects" element={ <About/> } />
      </Routes>
    </div>
  )
}

export default App