        // Add functionality to username suggestions
document.querySelectorAll('.suggestion').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('username').value = item.textContent;
    });
});

// Simple form validation + backend integration
document.querySelector('.button').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!email || !username || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        // Send signup data to backend
        const response = await fetch("http://127.0.0.1:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
        });

        if (response.ok) {
            alert("Account created successfully!");
            // Redirect to login page
            window.location.href = "login.html";
        } else {
            const errorData = await response.json();
            alert("Signup failed: " + (errorData.detail || "Unknown error"));
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server. Please try again later.");
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
