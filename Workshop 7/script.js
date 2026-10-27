document.addEventListener("DOMContentLoaded", () => {
  // HARJOITUS 1:
  const jsonString =
    '{ "employees" : [' +
    '{ "firstName":"John" , "lastName":"Doe" },' +
    '{ "firstName":"Anna" , "lastName":"Smith" },' +
    '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

  const obj = JSON.parse(jsonString);

  
  const buttons = document.querySelectorAll("button");

  
  buttons[0].addEventListener("click", () => {
    let html = "<h3>Työntekijät (Etu- ja sukunimi):</h3><ul>";
    obj.employees.forEach((emp) => {
      html += `<li>${emp.firstName} ${emp.lastName}</li>`;
    });
    html += "</ul>";
    document.getElementById("jsondata").innerHTML = html;
  });

 
  buttons[1].addEventListener("click", () => {
    let html = "<h3>Työntekijät (Kaikki tiedot):</h3><ul>";
    obj.employees.forEach((emp) => {
      html += `<li>Etunimi: ${emp.firstName}, Sukunimi: ${emp.lastName}</li>`;
    });
    html += "</ul>";
    document.getElementById("jsondata").innerHTML = html;
  });

  // HARJOITUS 2
  const omdbUrl = "https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750";

  buttons[2].addEventListener("click", () => {
    fetch(omdbUrl)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("rawdata").innerText = data;
      })
      .catch((error) => {
        console.error("Virhe ladattaessa dataa:", error);
        document.getElementById("rawdata").innerText =
          "Virhe ladattaessa dataa.";
      });
  });

  buttons[3].addEventListener("click", () => {
    fetch(omdbUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          let html = "<h3>Star Wars -elokuvat</h3>";
          html +=
            "<table border='1' cellpadding='8' style='border-collapse: collapse; width: 100%;'>";
          html +=
            "<tr style='background-color: #f2f2f2;'><th>Otsikko</th><th>Vuosi</th><th>IMDb ID</th><th>Juliste</th></tr>";

          data.Search.forEach((movie) => {
            html += `<tr>
                            <td>${movie.Title}</td>
                            <td>${movie.Year}</td>
                            <td>${movie.imdbID}</td>
                            <td><img src="${movie.Poster}" alt="${movie.Title}" width="50"></td>
                        </tr>`;
          });
          html += "</table>";
          document.getElementById("rawdata").innerHTML = html;
        } else {
          document.getElementById("rawdata").innerHTML =
            "<p>Elokuvia ei löytynyt.</p>";
        }
      })
      .catch((error) => {
        console.error("Virhe parsiessa dataa:", error);
        document.getElementById("rawdata").innerHTML =
          "<p>Virhe parsiessa dataa.</p>";
      });
  });

  // HARJOITUS 3
  const apiKey = "ff64c247a136f706923d1ee0d55d71e2";

  function getWeather(cityName) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=JSON&APPID=${apiKey}`;

    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          let html = `<h3>Säätiedot: ${data.name}, ${data.sys.country}</h3>`;
          html += `<p><b>Lämpötila:</b> ${data.main.temp} °C</p>`;
          html += `<p><b>Pilvisyys:</b> ${data.clouds.all} %</p>`;
          html += `<p><b>Ilmankosteus:</b> ${data.main.humidity} %</p>`;
          html += `<p><b>Säätila:</b> ${data.weather[0].description}</p>`;
          document.getElementById("weatherdata").innerHTML = html;
        } else {
          document.getElementById("weatherdata").innerHTML =
            `<p>Kaupunkia ei löytynyt: ${cityName}</p>`;
        }
      })
      .catch((error) => {
        console.error("Virhe säätietojen haussa:", error);
        document.getElementById("weatherdata").innerHTML =
          "<p>Virhe säätietojen haussa.</p>";
      });
  }

  buttons[4].addEventListener("click", () => {
    const selectedCity = document.getElementById("city").value;
    getWeather(selectedCity);
  });

  const citySelect = document.getElementById("city");
  citySelect.addEventListener("change", () => {
    getWeather(citySelect.value);
  });

  const searchButton = document.getElementById("search");
  const citySearchInput = document.getElementById("citysearch");

  searchButton.addEventListener("click", () => {
    const query = citySearchInput.value.trim();
    if (query) {
      getWeather(query);
    } else {
      alert("Kirjoita kaupungin nimi hakukenttään!");
    }
  });
});
