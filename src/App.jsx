import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'acc9c786fa694377b1c214851253007';

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch weather data.');
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <h1>🌤 Weather App</h1>

      <input
        className="input"
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button className="btn" onClick={fetchWeather}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      {weather?.location && (
        <div className="card">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <h3>{weather.current.temp_c}°C</h3>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather" />
        </div>
      )}
    </div>
  );
}

export default App;
