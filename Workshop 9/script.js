const apiKey = "2555a00cd7ae4637c5044e84de5caa23"; // <-- Lisää oma API-avain tähän
let tempChart = null; // globaali kaavioviite
let chartData = {}; // tallennetaan data ja labels uudelleenkäyttöä varten
let city = "Helsinki";

async function haeSaa() {
  city = document.getElementById("kaupunki").value;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fi&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data.list;
    console.log(data);
    // Poimitaan joka 3. tunti mitattu lämpötila ja aika
    const labels = data.slice(0, 12).map((item) => {
      const aika = new Date(item.dt_txt);
      return `${aika.getDate()}.${aika.getHours()}:00`;
    });

    const temperatures = data.slice(0, 12).map((item) => item.main.temp);
    chartData = { labels, temperatures }; // tallennetaan uudelleenkäyttöä varten
    console.log(temperatures);
    const type = document.getElementById("chartType").value;
    piirraKaavio(labels, temperatures, city, type);
  } catch (error) {
    console.error("Virhe datan haussa:", error);
    alert(
      "Säädatan hakeminen epäonnistui. Tarkista kaupungin nimi tai API-avain."
    );
  }
}

// Ladataan heti alkuun Helsingin sää
haeSaa();
function piirraKaavio(labels, data, city, type) {
  const ctx = document.getElementById("tempChart").getContext("2d");

  // Jos vanha kaavio on olemassa, tuhotaan se ensin
  if (window.tempChart && typeof window.tempChart.destroy === "function") {
    window.tempChart.destroy();
  }

  // Luodaan uusi kaavio
  window.tempChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: `Lämpötila (${city}) °C`,
          data: data,
          borderWidth: 2,
          borderColor: "rgb(75, 192, 192)",
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

function paivitaKaavio() {
  // Haetaan valittu kaavion tyyppi select-elementistä
  let type = document.getElementById("chartType").value;
  console.log(type);
  // Tarkistetaan, että meillä on aiemmin haettua dataa
  if (chartData.labels && chartData.temperatures) {
    // Piirretään kaavio uudelleen valitulla tyypillä
    piirraKaavio(chartData.labels, chartData.temperatures, city, type);
  }
}