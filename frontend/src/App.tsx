import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { StrictMode } from "react";
import "./index.css"; // Ensure your styles are imported

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
