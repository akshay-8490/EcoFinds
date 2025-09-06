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
        
        // Simulate login functionality
        document.querySelector('.btn-outline').addEventListener('click', function() {
            alert('Redirecting to login page...');
        });
        
        // Simulate signup functionality
        document.querySelector('.btn-primary').addEventListener('click', function() {
            alert('Redirecting to signup page...');
        });
        
<<<<<<< HEAD
       
=======
        // Add to cart functionality
        document.querySelectorAll('.cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.closest('.product-card').querySelector('.product-title').textContent;
                alert(`Added ${productName} to cart!`);
            });
        });
    function showResults(query) {
      resultsDiv.innerHTML = ''; // clear old results
      if (query.length === 0) return;

      const filtered = data.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length === 0) {
        resultsDiv.innerHTML = "<div class='result-item'>No results found</div>";
        return;
      }

      filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.textContent = item;
        resultsDiv.appendChild(div);
      });
    }

    // Event listener for typing
    searchInput.addEventListener('input', (e) => {
      showResults(e.target.value);
    });
>>>>>>> df8ab42999b8cc381a5afb7eb923166684444543
