import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WriteLetter from "./pages/writeLetter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<WriteLetter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
