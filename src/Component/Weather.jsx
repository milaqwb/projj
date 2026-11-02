import { useState } from "react";
import "./weather.css";

const API_KEY = "3f65c1567cf3d424a94ba82a95726b0a";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date();

  async function handleSearch(event) {
    event.preventDefault();

    if (!city.trim()) {
      setError("Enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim(),
        )}&appid=${API_KEY}&units=metric`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="weather-dashboard">
      <h1 className="weather-title">Weather dashboard</h1>

      <section className="weather-info">
        <p className="weather-description">
          Create your personal list of favorite cities and always be aware of
          the weather.
        </p>

        <div className="weather-date">
          <p>
            {today.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <p>
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search location..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "..." : "⌕"}
        </button>
      </form>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <section className="weather-result">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>

          <p>Temperature: {Math.round(weather.main.temp)}°C</p>

          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>

          <p>Weather: {weather.weather[0].description}</p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Wind speed: {weather.wind.speed} m/s</p>
        </section>
      )}
    </main>
  );
}
