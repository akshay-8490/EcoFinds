


// Toggle edit mode
        const editProfileBtn = document.getElementById('editProfileBtn');
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        const cancelEditBtn = document.getElementById('cancelEditBtn');
        const actionButtons = document.getElementById('actionButtons');
        const profileInfo = document.getElementById('profileInfo');
        const infoValues = document.querySelectorAll('.info-value');
        
        let originalValues = {};
        
        // Store original values
        infoValues.forEach(input => {
            originalValues[input.parentElement.querySelector('.info-label').textContent] = input.value;
        });
        
        editProfileBtn.addEventListener('click', function() {
            // Enable editing
            profileInfo.classList.add('edit-mode');
            infoValues.forEach(input => {
                input.removeAttribute('readonly');
            });
            
            // Show action buttons
            actionButtons.style.display = 'flex';
            
            // Hide edit button
            editProfileBtn.style.display = 'none';
        });
        
        saveProfileBtn.addEventListener('click', function() {
            // Save changes (in a real app, this would send data to server)
            
            
            // Disable editing
            profileInfo.classList.remove('edit-mode');
            infoValues.forEach(input => {
                input.setAttribute('readonly', true);
            });
            
            // Hide action buttons
            actionButtons.style.display = 'none';
            
            // Show edit button
            editProfileBtn.style.display = 'inline-block';
        });
        
        cancelEditBtn.addEventListener('click', function() {
            // Restore original values
            infoValues.forEach(input => {
                const label = input.parentElement.querySelector('.info-label').textContent;
                input.value = originalValues[label];
            });
            
            // Disable editing
            profileInfo.classList.remove('edit-mode');
            infoValues.forEach(input => {
                input.setAttribute('readonly', true);
            });
            
            // Hide action buttons
            actionButtons.style.display = 'none';
            
            // Show edit button
            editProfileBtn.style.display = 'inline-block';
        });
        
        // Navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // In a real application, this would load the appropriate content
                const sectionName = this.querySelector('span').textContent;
                document.querySelector('.content-title').textContent = sectionName;
            });
        });
        
        