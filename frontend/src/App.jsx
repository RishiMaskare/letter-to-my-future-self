import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WriteLetter from "./pages/WriteLetter";

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
