const apikey = "4d8fb5b93d4af21d66a2948710284366";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const backgroundImages = [
    'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
}

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    if (respData.cod === "404") {
      throw new Error("City not found");
    }

    addWeatherToPage(respData);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    showError(error.message);
  }
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <h2>
      <i class="weather-icon" data-feather="${getWeatherIcon(data.weather[0].icon)}"></i>
      ${temp}°C
    </h2>
    <small>${data.weather[0].main}</small>
    <p>${data.name}, ${data.sys.country}</p>
  `;
  main.innerHTML = "";
  main.appendChild(weather);
  
  // Initialize Feather icons
  feather.replace();
}

function getWeatherIcon(iconCode) {
  // Map OpenWeatherMap icon codes to Feather icon names
  const iconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud',
    '02n': 'cloud',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-drizzle',
    '09n': 'cloud-drizzle',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'wind',
    '50n': 'wind'
  };

  return iconMap[iconCode] || 'help-circle';
}

function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");
  errorDiv.innerHTML = `<p>${message}</p>`;
  main.innerHTML = "";
  main.appendChild(errorDiv);
}

function KtoC(K) {
  return Math.round(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();
  if (city) {
    getWeatherByLocation(city);
    setRandomBackground();
  }
});

function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("demo1").innerHTML = now.toLocaleDateString(undefined, options);
  document.getElementById("demo").innerHTML = now.toLocaleTimeString();
}

setInterval(updateDateTime, 1000);
updateDateTime();
setRandomBackground();
feather.replace();
