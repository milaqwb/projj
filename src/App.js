import "./App.css";
import { getWeather } from "./Component/fetch";
import { useEffect, useState } from "react";
import WeatherDashboard from "./Component/Weather";

function App() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await getWeather();
        setWeather(data);
      } catch (error) {
        console.log("Помилка:", error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div>
      <WeatherDashboard />

      {weather.map((city) => (
        <div key={city.id}>
          <h2>{city.name}</h2>
          <p>{city.main.temp} °C</p>
          <p>{city.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
