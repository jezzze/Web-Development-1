document.addEventListener('DOMContentLoaded', () => {

    const animalButton = document.querySelector('#animalButton');
    const animalTable = document.querySelector('#animalTable');

    if (animalButton && animalTable) {
        animalButton.addEventListener('click', () => {
            if (animalTable.style.display === 'none') {
                animalTable.style.display = 'table';
            } else {
                animalTable.style.display = 'none';
            }
        });
    }

   // <!-- TEHTÄVÄ 1 -->
    const taskOneHeading = document.querySelector('#taskOneHeading');
    const changeHeadingButton = document.querySelector('#changeHeadingButton');
    const changeStyleButton = document.querySelector('#changeStyleButton');
    const changeTextButton = document.querySelector('#changeTextButton');
    const animalText = document.querySelector('#animalText');

    if (changeHeadingButton && taskOneHeading) {
        changeHeadingButton.addEventListener('click', () => {
            taskOneHeading.textContent = 'Muokattu otsikko!';
        });
    }

    if (changeStyleButton && taskOneHeading) {
        changeStyleButton.addEventListener('click', () => {
            taskOneHeading.classList.toggle('highlight');
        });
    }

    if (changeTextButton && animalText) {
        changeTextButton.addEventListener('click', () => {
            animalText.textContent = 'Kissa on lihansyöjä ja yksi maailman suosituimmista lemmikeistä.';
        });
    }

    // <!-- TEHTÄVÄ 2 -->
    const animalContent = document.querySelector('#animalContent');

    if (animalContent) {
        const heading = document.createElement('h3');
        heading.textContent = 'Päivän eläin';

        heading.classList.add('animal-heading');
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Punainen panda on pieni puissa elävä nisäkäs, joka syö pääasiassa bambua.';

        const image = document.createElement('img');
        image.src = 'images/redpanda.jpg';
        image.alt = 'Punainen panda';
        image.width = 200;

        animalContent.append(heading, paragraph, image);
    }

    const hideAnimalButton = document.querySelector('#hideAnimalButton');
    const showAnimalButton = document.querySelector('#showAnimalButton');

    if (hideAnimalButton && animalContent) {
        hideAnimalButton.addEventListener('click', () => {
            animalContent.style.display = 'none';
        });
    }

    if (showAnimalButton && animalContent) {
        showAnimalButton.addEventListener('click', () => {
            animalContent.style.display = 'block';
        });
    }

    // <!-- TEHTÄVÄ 3 -->
    const animalSelect = document.querySelector('#animalSelect');
    const animalName = document.querySelector('#animalName');
    const animalImage = document.querySelector('#animalImage');
    const animalDescription = document.querySelector('#animalDescription');

    const animalsData = {
        'punainen panda': {
            name: 'Punainen panda',
            image: 'images/redpanda.jpg',
            alt: 'Punainen panda',
            description: 'Punainen panda on pieni puissa elävä nisäkäs, joka syö pääasiassa bambua.'
        },
        'kissa': {
            name: 'Kissa',
            image: 'images/cat.jpg',
            alt: 'Kissa',
            description: 'Kissa on lihansyöjä ja yksi maailman suosituimmista lemmikeistä.'
        },
        'kani': {
            name: 'Kani',
            image: 'images/bunny.jpg',
            alt: 'Kani',
            description: 'Kani on pieni nisäkäs, joka on tunnettu nopeasta liikkeestä ja hyvästä hajusta.'
        },
        'lammas': {
            name: 'Lammas',
            image: 'images/sheep.jpg',
            alt: 'Lammas',
            description: 'Lammas on yleinen maatilaeläin, joka on tunnettu pehmeästä karvastaan ja hiljaisesta luonnostaan.'
        }
    };

    if (animalSelect) {
        animalSelect.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            const data = animalsData[selectedValue];

            if (data) {
                animalName.textContent = data.name;
                animalImage.src = data.image;
                animalImage.alt = data.alt;
                animalDescription.textContent = data.description;
            }
        });
    }

    if (animalImage) {
        animalImage.addEventListener('mouseenter', () => {
            animalImage.classList.add('image-highlight');
        });

        animalImage.addEventListener('mouseleave', () => {
            animalImage.classList.remove('image-highlight');
        });
    }

   //<!-- TEHTÄVÄ 4 -->
    const animalForm = document.querySelector('#animalForm');
    const observationTableBody = document.querySelector('#observationTableBody');

    if (animalForm && observationTableBody) {
        animalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const animalInput = document.querySelector('#observationAnimal');
            const locationInput = document.querySelector('#observationLocation');
            const dateInput = document.querySelector('#observationDate');

            const animalVal = animalInput.value.trim();
            const locationVal = locationInput.value.trim();
            const dateVal = dateInput.value;

            if (!animalVal || !locationVal || !dateVal) {
                alert('Täytä kaikki kentät!');
                return;
            }

            const tr = document.createElement('tr');

            const tdAnimal = document.createElement('td');
            tdAnimal.textContent = animalVal;

            const tdLocation = document.createElement('td');
            tdLocation.textContent = locationVal;

            const tdDate = document.createElement('td');
            tdDate.textContent = dateVal;

            tr.append(tdAnimal, tdLocation, tdDate);
            addDeleteButton(tr);

            observationTableBody.appendChild(tr);

            animalForm.reset();
        });
    }

    // BONUSTEHTÄVÄ: Käy läpi li-elementit
    function createButton(label, handler) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', handler);
        return button;
    }

    const task1Buttons = document.querySelector('#changeTextButton')?.parentElement;

    if (task1Buttons && animalText) {
        const addSentenceButton = createButton('Lisää lause', () => {
            animalText.textContent += ' Tämä on uusi lause.';
        });

        const colors = ['#f5f5f5', '#fff3cd', '#d1ecf1', '#d4edda', '#f8d7da'];
        let colorIndex = 0;

        const backgroundButton = createButton('Vaihda taustaväri', () => {
            colorIndex = (colorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[colorIndex];
        });

        task1Buttons.append(addSentenceButton, backgroundButton);
    }

    function addDeleteButton(row) {
        const td = document.createElement('td');
        const deleteButton = createButton('Poista', () => row.remove());
        td.append(deleteButton);
        row.append(td);
    }

    const observationHeadRow = document.querySelector('#observationTable thead tr');

    if (observationHeadRow && observationTableBody) {
        observationHeadRow.append(document.createElement('th')); // tyhjä otsikkosarake
        observationTableBody.querySelectorAll('tr').forEach(addDeleteButton);
    }

    const bonusSection = document.querySelector('main section:last-of-type');

    if (bonusSection && animalImage) {
        const imageParent = animalImage.parentElement;
        const imageNextSibling = animalImage.nextElementSibling;

        const imageButtons = document.createElement('div');
        imageButtons.classList.add('buttons');

        imageButtons.append(
            createButton('Siirrä kuvaa', () => {
                animalImage.classList.toggle('image-moved');
            }),
            createButton('Animoi kuva', () => {
                animalImage.classList.toggle('image-animate');
            }),
            createButton('Häivytä kuva', () => {
                animalImage.classList.toggle('image-fade');
            }),
            createButton('Poista kuva', () => {
                animalImage.remove();
            }),
            createButton('Palauta kuva', () => {
                if (!animalImage.isConnected) {
                    imageParent.insertBefore(animalImage, imageNextSibling);
                }
            })
        );

        bonusSection.append(imageButtons);
    }

    const allListItems = document.querySelectorAll('li');

    if (bonusSection) {
        bonusSection.append(
            createButton('Käy läpi li-elementit', () => {
                allListItems.forEach((li, index) => {
                    console.log(`Lista-alkio ${index + 1}: ${li.textContent.trim()}`);
                    li.classList.add('visited');
                });
                console.log(`Yhteensä ${allListItems.length} li-elementtiä`);
            })
        );
    }

});