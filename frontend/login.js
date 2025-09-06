 // Form validation
document.querySelector('.button').addEventListener('click', async (e) => {
    e.preventDefault();
    
    const emailOrUsername = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!emailOrUsername || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!validateEmail(emailOrUsername) && !validateUsername(emailOrUsername)) {
        showError('Please enter a valid email or username');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }

    try {
        // Send login data to backend
        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier: emailOrUsername, password }),
        });

        if (response.ok) {
            const data = await response.json();
            
            // Store user data or token in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            
            showSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = "homepage.html"; // Redirect to homepage
            }, 1500);
        } else {
            const errorData = await response.json();
            showError(errorData.detail || "Invalid login credentials");
        }
    } catch (err) {
        console.error(err);
        showError("Error connecting to server. Please try again later.");
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateUsername(username) {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="color: #d9534f; background-color: #f8d7da; padding: 12px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #f5c6cb;">
            <i class="fas fa-exclamation-circle"></i> ${message}
        </div>
    `;
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    document.querySelector('.points-section').before(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="color: #155724; background-color: #d4edda; padding: 12px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
            <i class="fas fa-check-circle"></i> ${message}
        </div>
    `;
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) existingSuccess.remove();
    document.querySelector('.points-section').before(successDiv);
    setTimeout(() => successDiv.remove(), 5000);
}
