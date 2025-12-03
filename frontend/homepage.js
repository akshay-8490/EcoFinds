document.addEventListener('DOMContentLoaded', () => {

    // --- NEW AUTH LOGIC ---

    // Function to check login status and update the UI
    function updateAuthUI() {
        // The 'user' key is set in localStorage upon successful login/signup
        const user = localStorage.getItem('user');
        
        // Select the two main containers using the IDs defined in homepage.html
        const loggedOutActions = document.getElementById('logged-out-actions');
        const loggedInActions = document.getElementById('logged-in-actions');

        if (user) {
            // User is logged in: Hide Login/Signup, Show Profile/Cart/Logout
            if (loggedOutActions) loggedOutActions.style.display = 'none';
            // Use 'flex' because the original HTML suggests button layout is horizontal
            if (loggedInActions) loggedInActions.style.display = 'flex'; 
        } else {
            // User is logged out: Show Login/Signup, Hide Profile/Cart/Logout
            if (loggedOutActions) loggedOutActions.style.display = 'flex'; 
            if (loggedInActions) loggedInActions.style.display = 'none';
        }
    }

    // Function to handle logout
    function logout() {
        localStorage.removeItem('user'); // Clear the stored user data
        window.location.reload(); // Reload the page to update the navigation bar
    }
    
    // --- Execution ---
    
    // 1. Run the UI update when the page first loads
    updateAuthUI(); 

    // 2. Attach listener for the logout button
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // --- EXISTING FUNCTIONALITY (No changes here) ---

    // View Details Button functionality
    document.querySelectorAll('.view-btn1, .view-btn2, .view-btn3, .view-btn4').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('view-btn1')) {
                window.location.href = 'img1.html';
            } else if (this.classList.contains('view-btn2')) {
                window.location.href = 'img2.html';
            } else if (this.classList.contains('view-btn3')) {
                window.location.href = 'img3.html';
            } else if (this.classList.contains('view-btn4')) {
                window.location.href = 'img4.html';
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Nav search functionality
    document.querySelector('.nav-search button').addEventListener('click', function() {
        const searchTerm = document.querySelector('.nav-search input').value;
        if (searchTerm.trim() !== '') {
            alert(`Searching for: ${searchTerm}`);
            // In a real application, this would filter products
        }
    });
});