// frontend/src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// We import the components
import StartPrediction from "./components/StartPrediction";
import History from "./components/History";
import "./App.css"; // Don't forget to import your CSS!

function App() {
  // --- We move ALL state from StartPrediction up to App ---
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [pH, setpH] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // --------------------------------------------------------

  const startProps = {
    N,
    setN,
    P,
    setP,
    K,
    setK,
    pH,
    setpH,
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    rainfall,
    setRainfall,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    prediction,
    setPrediction,
    error,
    setError,
    isLoading,
    setIsLoading,
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* Top nav uses pill buttons styled in App.css */}
        <div className="top-nav" role="navigation" aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Start
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            History
          </NavLink>
        </div>

        <div className="nav-divider" />

        <Routes>
          {/* We now pass all the props down to the StartPrediction component */}
          <Route path="/" element={<StartPrediction {...startProps} />} />

          {/* History page doesn't need any props */}
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
