// Function to fetch and display the list of places
async function fetchPlaces() {
    try {
        const response = await fetch('https://api.example.com/places'); // Replace with your API endpoint
        if (response.ok) {
            const places = await response.json();
            displayPlaces(places);
            populateCountryFilter(places);
        } else {
            console.error('Failed to fetch places:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

// Function to display places in the list
function displayPlaces(places) {
    const placesList = document.getElementById('places-list-items');
    placesList.innerHTML = ''; // Clear existing content

    places.forEach(place => {
        const placeCard = document.createElement('li');
        placeCard.className = 'place-card';

        const img = document.createElement('img');
        img.src = place.imageUrl; // Adjust property name as needed
        img.className = 'place-image';
        img.alt = 'Place Image';

        const name = document.createElement('h3');
        name.textContent = place.name;

        const price = document.createElement('p');
        price.textContent = `Price per night: $${place.price}`;

        const location = document.createElement('p');
        location.textContent = `Location: ${place.location}`;

        placeCard.appendChild(img);
        placeCard.appendChild(name);
        placeCard.appendChild(price);
        placeCard.appendChild(location);

        placesList.appendChild(placeCard);
    });
}

// Function to populate country filter options
function populateCountryFilter(places) {
    const countryFilter = document.getElementById('country-filter');
    const countries = new Set(places.map(place => place.country));

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
    });
}

// Function to handle filter changes
document.getElementById('country-filter').addEventListener('change', function() {
    const selectedCountry = this.value;
    if (selectedCountry === 'all') {
        fetchPlaces(); // Fetch all places if 'all' is selected
    } else {
        fetchPlacesByCountry(selectedCountry);
    }
});

// Function to fetch places by selected country
async function fetchPlacesByCountry(country) {
    try {
        const response = await fetch(`https://api.example.com/places?country=${country}`); // Replace with your API endpoint
        if (response.ok) {
            const places = await response.json();
            displayPlaces(places);
        } else {
            console.error('Failed to fetch places by country:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching places by country:', error);
    }
}

// Initialize functionality on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchPlaces(); // Fetch and display all places initially
});
