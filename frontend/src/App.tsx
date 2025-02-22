import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { StrictMode } from "react";
import "./index.css"; // Ensure your styles are imported
import LearnMore from "./components/learnmore";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/LearnMore" element={<LearnMore />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
