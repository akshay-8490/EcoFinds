 // Form validation
        document.querySelector('.button').addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email) && !validateUsername(email)) {
                showError('Please enter a valid email or username');
                return;
            }
            
            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }
            
            // Simulate successful login
                showSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    // In a real application, this would redirect to the dashboard
                    alert('Redirecting to dashboard');
                }, 1500);
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
            // Create error message element
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerHTML = `
                <div style="color: #d9534f; background-color: #f8d7da; padding: 12px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #f5c6cb;">
                    <i class="fas fa-exclamation-circle"></i> ${message}
                </div>
            `;
            
            // Remove any existing error messages
            const existingError = document.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Insert error message
            document.querySelector('.points-section').before(errorDiv);
            
            // Remove error after 5 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }
        
        function showSuccess(message) {
            // Create success message element
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = `
                <div style="color: #155724; background-color: #d4edda; padding: 12px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
                    <i class="fas fa-check-circle"></i> ${message}
                </div>
            `;
            
            // Remove any existing messages
            const existingError = document.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            const existingSuccess = document.querySelector('.success-message');
            if (existingSuccess) {
                existingSuccess.remove();
            }
            
            // Insert success message
            document.querySelector('.points-section').before(successDiv);
            
            // Remove success after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }