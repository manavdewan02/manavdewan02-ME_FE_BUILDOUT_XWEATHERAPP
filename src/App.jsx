import { useState } from "react";

const API_KEY = "719827e90e204e3393d171855263001"; 

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!res.ok) {
        throw new Error("Invalid city");
      }

      const data = await res.json();
      setWeather(data.current);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Loading Message */}
      {loading && <p>Loading data…</p>}

      {/* Weather Cards */}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.temp_c} °C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.humidity} %</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.condition.text}</p>
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
