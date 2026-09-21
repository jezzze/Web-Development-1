document.addEventListener("DOMContentLoaded", () => {

    //HARJOITUS 1:
    const buttons = document.querySelectorAll("button");
    const alertBtn = buttons[0];      
    const tableBtn = buttons[1];      
    const tableContainer = document.querySelector("#tableContainer");

    if (alertBtn) {
        alertBtn.onclick = () => {
            alert("Klikkasit minua!");
        };
    }

    if (tableBtn) {
        tableBtn.onclick = showTable;
    }

    function showTable() {
        const animal = "Koira";
        const habitat = "Koti";
        const diet = "Liha";

        const tableHTML = `
            <table style="border-collapse: collapse; width: 100%; box-sizing: border-box; border: 1px solid #777; margin: 0;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #777; padding: 6px 10px; text-align: center; width: 40%;">Eläin</th>
                        <th style="border: 1px solid #777; padding: 6px 10px; text-align: center; width: 40%;">Elinympäristö</th>
                        <th style="border: 1px solid #777; padding: 6px 10px; text-align: center; width: 20%;">Ruokavalio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #777; padding: 6px 10px; text-align: left;">${animal}</td>
                        <td style="border: 1px solid #777; padding: 6px 10px; text-align: left;">${habitat}</td>
                        <td style="border: 1px solid #777; padding: 6px 10px; text-align: left;">${diet}</td>
                    </tr>
                </tbody>
            </table>
        `;

        if (tableContainer) {
            tableContainer.innerHTML = tableHTML;
        }
    }

    //HARJOITUS 2: 
    const headings = document.querySelectorAll("h2");
    
    const h2Exercise1 = headings[0];
    const h2Exercise2 = headings[1];

    if (h2Exercise2) {
        h2Exercise2.addEventListener("mouseover", () => {
            console.log("Liikuit hiirellä ylitseni!");
        });
    }

    if (h2Exercise1) {
        h2Exercise1.addEventListener("click", () => {
            h2Exercise1.style.color = "red";
            h2Exercise1.innerHTML = "Näkemiin hiiri!";
        });
    }

    //HARJOITUS 3:
    const textarea = document.querySelector("#feedback");
    const statusDiv = document.querySelector("#status");
    const charcountSpan = document.querySelector("#charcount");
    const previewDiv = document.querySelector("#preview");

    if (textarea) {
        textarea.addEventListener("focus", () => {
            if (statusDiv) statusDiv.textContent = "Kirjoitetaan palautetta...";
            textarea.style.backgroundColor = "#eef8ff";
        });

        textarea.addEventListener("blur", () => {
            if (statusDiv) statusDiv.textContent = "";
            textarea.style.backgroundColor = "";
        });

        textarea.addEventListener("input", () => {
            const currentLength = textarea.value.length;
            
            if (charcountSpan) {
                charcountSpan.textContent = `${currentLength}/200`;
                charcountSpan.style.color = currentLength > 200 ? "red" : "black";
            }

            if (previewDiv) {
                previewDiv.textContent = textarea.value.length > 0 
                    ? textarea.value 
                    : "(Esikatselu tulee tähän)";
            }
        });
    }

    //HARJOITUS 4:
    const form = document.querySelector("#feedbackForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const feedbackText = textarea ? textarea.value.trim() : "";
            const textLength = feedbackText.length;

            if (textLength < 10 || textLength > 200) {
                alert(`Virhe: Palautteen tulee olla 10–200 merkkiä pitkä. Nyt pituus on ${textLength} merkkiä.`);
            } else {
                alert("Kiitos palautteestasi!");
                
                form.reset();
                if (charcountSpan) charcountSpan.textContent = "0/200";
                if (previewDiv) previewDiv.textContent = "(Esikatselu tulee tähän)";
            }
        });
    }

    //HARJOITUS 5:
    const keybox = document.querySelector("#keybox");
    const keyinfo = document.querySelector("#keyinfo");
    let keyPressCounter = 0;

    document.addEventListener("keydown", (event) => {
        console.log("Näppäintapahtuma (keydown):", event);

        keyPressCounter++;

        const activeModifiers = [];
        if (event.shiftKey) activeModifiers.push("Shift");
        if (event.ctrlKey) activeModifiers.push("Ctrl");
        if (event.altKey) activeModifiers.push("Alt");
        const modifiersText = activeModifiers.length > 0 ? activeModifiers.join(" + ") : "Ei mitään";

        if (keyinfo) {
            keyinfo.innerHTML = `
                <strong>Painettu näppäin:</strong> ${event.key}<br>
                <strong>Koodi:</strong> ${event.code}<br>
                <strong>Painalluksia yhteensä:</strong> ${keyPressCounter}<br>
                <strong>Erikoisnäppäimet pohjassa:</strong> ${modifiersText}
            `;
        }

        if (keybox) {
            keybox.textContent = event.key === " " ? "Välilyönti" : event.key;
            keybox.style.fontSize = "3em";
            keybox.style.textAlign = "center";

            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            keybox.style.backgroundColor = randomColor;
        }
    });

    // bonus tehtävä
    const bonusButton = document.createElement("button");
    bonusButton.textContent = "Avaa oma sijainti Google Mapsissa";
    bonusButton.style.marginTop = "15px";
    bonusButton.style.padding = "10px 15px";
    bonusButton.style.cursor = "pointer";

    document.body.appendChild(bonusButton);

    bonusButton.addEventListener("click", () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    console.log("Leveysaste:", lat);
                    console.log("Pituusaste:", lon);

                    const url = `https://www.google.com/maps?q=${lat},${lon}`;
                    window.open(url, "_blank");
                },
                (error) => {
                    alert("Sijaintia ei voitu hakea: " + error.message);
                }
            );
        } else {
            alert("Selain ei tue Geolocation APIa.");
        }
    });

});