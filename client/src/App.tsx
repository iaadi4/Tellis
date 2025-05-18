import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { NotFound } from "./components/ui/ghost-404-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;