// Store your OpenWeatherMap API key.
const apiKey = "2555a00cd7ae4637c5044e84de5caa23";

// Find the HTML element where we display the weather data.
// Run this function when the user clicks the "Fetch data" button.
// async allows us to use await inside the function.
const weatherDataDiv = document.getElementById("weatherdata");
const citySelect = document.getElementById("city");
const cityInput = document.getElementById("citysearch");
const searchBtn = document.getElementById("search");
const fetchWeatherBtn = document.getElementById("fetchWeather");
const listButton = document.querySelector("ul li button");

// Pääfunktio säätietojen hakemiseen ja parsimiseen
async function fetchWeatherData(cityName) {
  // Display a loading message.
  weatherDataDiv.innerHTML = "<p>Ladataan säätietoja...</p>";

  // Try to fetch and process the weather data.
  try {
    // Send a GET request to the weather API and wait for the response.
    // q=Helsinki selects the city.
    // units=metric gives the temperature in Celsius.
    // mode=xml requests the data in XML format.
    // ${apiKey} inserts our API key into the URL.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&mode=xml&APPID=${apiKey}`;
    const response = await fetch(url);

    // Check whether the API returned a successful HTTP status.
    if (!response.ok) {
      // Create an error and jump to the catch block.
      throw new Error(`HTTP-virhe: ${response.status}`);
    }

    // Read the response body as text and wait until it is ready.
    const xmlText = await response.text();

    // Parsitaan XML-teksti DOM-muotoon
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Haetaan tiedot XML-elementeistä
    const name = xmlDoc.querySelector("city")?.getAttribute("name") || cityName;
    const temp = xmlDoc.querySelector("temperature")?.getAttribute("value");
    const clouds = xmlDoc.querySelector("clouds")?.getAttribute("name");
    const humidity = xmlDoc.querySelector("humidity")?.getAttribute("value");
    const humidityUnit =
      xmlDoc.querySelector("humidity")?.getAttribute("unit") || "%";

    // Display the XML as plain text on the page.
    weatherDataDiv.innerHTML = `
            <h3>Sää kaupungissa: ${name}</h3>
            <p><strong>Lämpötila:</strong> ${temp} °C</p>
            <p><strong>Pilvisyys:</strong> ${clouds}</p>
            <p><strong>Ilmankosteus:</strong> ${humidity} ${humidityUnit}</p>
        `;
  } catch (error) {
    // Handle errors from the request or the code above.
    // Choose an error message in the page's language.
    const errorMessage = "Säätietojen hakeminen epäonnistui.";

    // Display the message and details of the error.
    weatherDataDiv.innerHTML = `<p style="color: red;"><strong>${errorMessage}</strong> (${error.message})</p>`;
  }
}

// Lisätään tapahtumankuuntelijat painikkeille ja valikoille

// 1. Listassa oleva "Hae data" -painike
if (listButton) {
  listButton.addEventListener("click", () => {
    const selectedCity = citySelect ? citySelect.value : "Helsinki";
    fetchWeatherData(selectedCity);
  });
}

// 2. Sivun alaosassa oleva "Hae data" -painike
if (fetchWeatherBtn) {
  fetchWeatherBtn.addEventListener("click", () => fetchWeatherData("Helsinki"));
}

// 3. Pudotusvalikon muutos (onchange)
if (citySelect) {
  citySelect.addEventListener("change", (e) => {
    fetchWeatherData(e.target.value);
  });
}

// 4. Hakukentän "Hae" -painike
if (searchBtn && cityInput) {
  searchBtn.addEventListener("click", () => {
    const query = cityInput.value.trim();
    if (query) {
      fetchWeatherData(query);
    }
  });
}
