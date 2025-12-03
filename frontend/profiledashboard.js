document.addEventListener('DOMContentLoaded', () => {

    // 1. --- LOAD USER DATA FROM LOCAL STORAGE ---
    const userJson = localStorage.getItem('user');
    let userData = {};
    let displayName = 'Guest';
    let displayEmail = 'guest@example.com';

    if (userJson) {
        try {
            userData = JSON.parse(userJson);
            // Assuming userData contains 'username' and 'email'
            displayName = userData.username || userData.email; 
            displayEmail = userData.email;
        } catch (e) {
            console.error("Failed to parse user data from localStorage:", e);
        }
    } else {
        console.warn("User data not found. Displaying default data.");
        // window.location.href = "login.html"; // Optional: Redirect unauthenticated users
    }
    
    // 2. --- POPULATE HTML ELEMENTS (FIXED SELECTORS) ---

    // Get sidebar elements
    const userNameSidebar = document.querySelector('.profile-card .user-name');
    const userEmailSidebar = document.querySelector('.profile-card .user-email');
    
    // Get main content input fields using their reliable classes
    const infoNameInput = document.querySelector('.user-fullname-input');
    const infoEmailInput = document.querySelector('.user-email-input');
    
    // Update the displayed user info in the sidebar
    if (userNameSidebar) {
        userNameSidebar.textContent = displayName;
    }
    if (userEmailSidebar) {
        userEmailSidebar.textContent = displayEmail;
    }

    // Update the 'Full Name' and 'Email Address' input fields in the main info grid
    if (infoNameInput) {
        infoNameInput.value = displayName;
    }
    if (infoEmailInput) {
        infoEmailInput.value = displayEmail;
    }


    // 3. --- TOGGLE EDIT MODE AND SAVE FUNCTIONALITY (UPDATED FOR API PERSISTENCE) ---

    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const actionButtons = document.getElementById('actionButtons');
    const profileInfo = document.getElementById('profileInfo');
    const infoValues = document.querySelectorAll('.info-value');
    
    let originalValues = {};
    
    // Store original values (must run AFTER initial population of fields)
    infoValues.forEach(input => {
        originalValues[input.parentElement.querySelector('.info-label').textContent] = input.value;
    });
    
    editProfileBtn.addEventListener('click', function() {
        // Store current values *before* enabling edit mode (in case user clicks edit twice)
        infoValues.forEach(input => {
            const label = input.parentElement.querySelector('.info-label').textContent;
            originalValues[label] = input.value;
        });

        // Enable editing
        profileInfo.classList.add('edit-mode');
        infoValues.forEach(input => {
            // Do not enable editing for email/status/etc.
            if (!input.classList.contains('user-email-input')) { 
                 input.removeAttribute('readonly');
            }
        });
        
        // Show action buttons
        actionButtons.style.display = 'flex';
        
        // Hide edit button
        editProfileBtn.style.display = 'none';
    });
    
    saveProfileBtn.addEventListener('click', async function() { // 🌟 MADE ASYNC 🌟
        
        const newProfileData = {};
        infoValues.forEach(input => {
            const label = input.parentElement.querySelector('.info-label').textContent;
            newProfileData[label] = input.value;
        });
        
        // 🌟 Prepare Payload for FastAPI 🌟
        // Assuming 'Full Name' is the new username, and we need the original email to identify the user
        // NOTE: This assumes the user's ID or original email is used for lookup on the backend.
        const payload = {
            username: newProfileData['Full Name'],
            email: infoEmailInput.value, // Use the (unedited) email as identifier
            // Add other fields your API requires, like phone number:
            // phone_number: newProfileData['Phone Number'] 
        };

        let saveSuccessful = false;
        
        try {
            // 🌟 API Call to Update Profile 🌟
            const response = await fetch("http://127.0.0.1:8000/profile/update", { // Must match your FastAPI endpoint
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                
                // 🌟 SUCCESS: Update Local Storage 🌟
                let storedUser = JSON.parse(localStorage.getItem('user'));
                
                // Update the stored user object with the new username
                storedUser.username = payload.username; 
                localStorage.setItem('user', JSON.stringify(storedUser));
                
                // Update sidebar name immediately
                if (userNameSidebar && infoNameInput) {
                    userNameSidebar.textContent = infoNameInput.value;
                }

                console.log("Profile updated successfully and changes stored locally.");
                saveSuccessful = true;

            } else {
                // Handle API error response (e.g., username already taken)
                const errorData = await response.json();
                console.error("Server update failed:", errorData.detail);
                alert(`Error saving profile: ${errorData.detail || response.statusText}`);
            }

        } catch (err) {
            console.error("Network or connection error:", err);
            alert("Could not connect to the server. Please try again.");
        }
        
        // --- UI RESET (Run regardless of save success) ---
        
        // Disable editing
        profileInfo.classList.remove('edit-mode');
        infoValues.forEach(input => {
            input.setAttribute('readonly', true);
        });
        
        // Hide action buttons
        actionButtons.style.display = 'none';
        
        // Show edit button
        editProfileBtn.style.display = 'inline-block';
        
        // If the save failed, the page content will reflect the old localStorage data on refresh.
        // If save failed, you might want to force a refresh here to revert local display changes:
        // if (!saveSuccessful) { window.location.reload(); }
    });
    
    cancelEditBtn.addEventListener('click', function() {
        // Restore original values
        infoValues.forEach(input => {
            const label = input.parentElement.querySelector('.info-label').textContent;
            input.value = originalValues[label];
        });
        
        // Disable editing (UI reset)
        profileInfo.classList.remove('edit-mode');
        infoValues.forEach(input => {
            input.setAttribute('readonly', true);
        });
        
        // Hide action buttons
        actionButtons.style.display = 'none';
        
        // Show edit button
        editProfileBtn.style.display = 'inline-block';
    });
    
    // 4. --- NAVIGATION ACTIVE STATE ---

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default action for links starting with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
            
            // Handle active class
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update the main title based on the selected section
            const sectionName = this.querySelector('span').textContent;
            document.querySelector('.content-title').textContent = sectionName;
        });
    });
});