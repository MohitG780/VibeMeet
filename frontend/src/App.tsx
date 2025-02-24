import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { StrictMode } from "react";
import "./index.css"; // Ensure your styles are imported
import LearnMore from "./components/learnmore";
import Terms from "./components/terms";
import { Landing } from "./components/Landing";
import { Helmet } from "react-helmet"; // Import Helmet

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>VibeMeet</title>
                </Helmet>
                <Homepage />
              </>
            }
          />
          <Route
            path="/LearnMore"
            element={
              <>
                <Helmet>
                  <title>VibeMeet</title>
                </Helmet>
                <LearnMore />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <Helmet>
                  <title>VibeMeet</title>
                </Helmet>
                <Terms />
              </>
            }
          />
          <Route
            path="/Landing"
            element={
              <>
                <Helmet>
                  <title>VibeMeet</title>
                </Helmet>
                <Landing />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}



export default App;
