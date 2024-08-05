// Function to handle the form submission
document.getElementById('review-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const place = document.getElementById('place').value;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('review-rating').value;

    // Check if all required fields are filled
    if (!place || !review || !rating) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        // Prepare data for submission
        const reviewData = {
            place: place,
            review: review,
            rating: rating
        };

        // Make POST request to submit the review
        const response = await fetch('https://api.example.com/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` // Replace with your method to get the auth token
            },
            body: JSON.stringify(reviewData)
        });

        if (response.ok) {
            // Successfully submitted the review
            alert('Review submitted successfully!');
            document.getElementById('review-form').reset(); // Reset the form
        } else {
            console.error('Failed to submit review:', response.statusText);
            alert('Failed to submit review. Please try again later.');
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Function to get the authentication token (placeholder example)
function getToken() {
    // Replace this with your method for getting the token, e.g., from cookies
    return 'your-jwt-token'; // Replace with actual token retrieval logic
}
