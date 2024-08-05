// Function to extract place ID from URL
function getPlaceIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('placeId');
}

// Function to get a cookie value by its name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to check user authentication and fetch place details
async function checkAuthentication() {
    const token = getCookie('token');
    const addReviewLink = document.getElementById('add-review-link');

    if (token) {
        addReviewLink.style.display = 'block';
        const placeId = getPlaceIdFromURL();
        if (placeId) {
            await fetchPlaceDetails(token, placeId);
        }
    } else {
        addReviewLink.style.display = 'none';
    }
}

// Function to fetch place details from the API
async function fetchPlaceDetails(token, placeId) {
    try {
        const response = await fetch(`https://api.example.com/places/${placeId}`, { // Replace with your API endpoint
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const place = await response.json();
            displayPlaceDetails(place);
        } else {
            console.error('Failed to fetch place details:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching place details:', error);
    }
}

// Function to dynamically display place details
function displayPlaceDetails(place) {
    const placeDetailsSection = document.getElementById('place-details');
    placeDetailsSection.innerHTML = ''; // Clear any existing content

    const name = document.createElement('h2');
    name.textContent = place.name;

    const description = document.createElement('p');
    description.textContent = `Description: ${place.description}`;

    const location = document.createElement('p');
    location.textContent = `Location: ${place.location}`;

    const imageContainer = document.createElement('div');
    place.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = place.name;
        img.className = 'place-image';
        imageContainer.appendChild(img);
    });

    placeDetailsSection.appendChild(name);
    placeDetailsSection.appendChild(description);
    placeDetailsSection.appendChild(location);
    placeDetailsSection.appendChild(imageContainer);
}

// Initialize functionality on page load
document.addEventListener('DOMContentLoaded', checkAuthentication);
