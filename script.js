async function getCardData() {
    // Fetch the JSON file and convert it into JavaScript objects.
    const response = await fetch('cards.json');
    const cardData = await response.json();

    // Created one Card object for each item in the array.
    for (let i = 0; i < cardData.length; i++) {    // loop through cardData and create a new Card object for each item.
        const c = new Card(
            cardData[i].name,
            cardData[i].country,
            cardData[i].number,
            cardData[i].image
        );
        c.displayCard();
    }
}

class Card {
    constructor(name, country, number, image) { // created a class so I can build multiple cards with their own information and behavior
        this.name = name;
        this.country = country;
        this.number = number;
        this.image = image;

        // Create the card's outer element.
        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('card');
        this.cardElement.tabIndex = 0;
        this.cardElement.setAttribute('role', 'button');
        this.cardElement.setAttribute('aria-pressed', 'false');

        // Create the elements for the card's information.
        this.imageElement = document.createElement('img');
        this.nameElement = document.createElement('h2');
        this.countryElement = document.createElement('p');
        this.numberElement = document.createElement('p');

        // Place the information elements inside the card.
        this.cardElement.appendChild(this.imageElement);
        this.cardElement.appendChild(this.nameElement);
        this.cardElement.appendChild(this.countryElement);
        this.cardElement.appendChild(this.numberElement);

        // Keep the same event-listener structure as the Book example.
        const that = this;
        this.onClick = function() {
            that.highlight();
        };
        this.cardElement.addEventListener('click', this.onClick);

        // Let keyboard users select a card with Enter or Space, too.
        this.cardElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                that.highlight();
            }
        });

        // Add the completed card element to the page.
        document.getElementById('card_container').appendChild(this.cardElement);
    }

    displayCard() {
        // Put this card's data into its HTML elements.
        this.imageElement.src = this.image;
        this.imageElement.alt = this.country + ' soccer jersey illustration';
        this.nameElement.innerText = this.name;
        this.countryElement.innerText = this.country;
        this.numberElement.innerText = 'Card #' + this.number;
    }

    highlight() {
        // Toggle adds the class if missing and removes it if already present.
        const selected = this.cardElement.classList.toggle('selected');
        this.cardElement.setAttribute('aria-pressed', selected);
    }
}

getCardData();
