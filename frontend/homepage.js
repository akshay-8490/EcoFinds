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
        
        // Simulate login functionality
        document.querySelector('.btn-outline').addEventListener('click', function() {
            alert('Redirecting to login page...');
        });
        
        // Simulate signup functionality
        document.querySelector('.btn-primary').addEventListener('click', function() {
            alert('Redirecting to signup page...');
        });
        
        // Add to cart functionality
        document.querySelectorAll('.cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.closest('.product-card').querySelector('.product-title').textContent;
                alert(`Added ${productName} to cart!`);
            });
        });