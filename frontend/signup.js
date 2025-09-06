  // Add functionality to username suggestions
        document.querySelectorAll('.suggestion').forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('username').value = item.textContent;
            });
        });
        
        // Simple form validation
        document.querySelector('.button').addEventListener('click', () => {
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
            
            alert('Account created successfully!');
        });
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }