// Function to handle form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    // Clear any previous errors
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';

    try {
        const response = await fetch('https://api.example.com/login', { // Replace with your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            // Store the JWT token in a cookie
            document.cookie = `token=${data.token}; path=/`;
            // Redirect to the main page or another page as needed
            window.location.href = 'index.html'; // Adjust the redirection URL as needed
        } else {
            const errorData = await response.json();
            errorDiv.textContent = errorData.message || 'Login failed. Please try again.';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorDiv.textContent = 'An unexpected error occurred. Please try again later.';
        errorDiv.style.display = 'block';
    }
}

// Initialize event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);
});
