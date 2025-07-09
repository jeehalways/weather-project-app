const elements = {
  temperature: document.querySelector("#temperature"),
  city: document.querySelector("#city"),
  description: document.querySelector("#description"),
  humidity: document.querySelector("#humidity"),
  speed: document.querySelector("#speed"),
  time: document.querySelector("#time"),
  icon: document.querySelector("#icon"),
};

function updateWeather(response) {
  const {
    city,
    time,
    temperature: { current, humidity },
    wind: { speed },
    condition: { description, icon_url },
  } = response.data;

  const date = new Date(time * 1000);

  elements.icon.innerHTML = `<img src="${icon_url}" class="weather-app-icon" />`;
  elements.city.textContent = city;
  elements.time.textContent = formatDate(date);
  elements.description.textContent = description;
  elements.humidity.textContent = `${humidity}%`;
  elements.speed.textContent = `${speed}km/h`;
  elements.temperature.textContent = Math.round(current);
}

function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  const apiKey = "3ed42bdf70af90btac454840e3c5oa26";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

searchCity("Stockholm");
