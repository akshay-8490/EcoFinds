 // Search functionality
        document.getElementById('searchBtn').addEventListener('click', function() {
            const searchTerm = document.getElementById('searchInput').value;
            if (searchTerm.trim() !== '') {
                alert(`Searching for: ${searchTerm}`);
                // In a real application, this would filter products
            }
        });
        
        // Sort functionality
        document.getElementById('sortSelect').addEventListener('change', function() {
            if (this.value !== '') {
                alert(`Sorting by: ${this.options[this.selectedIndex].text}`);
                // In a real application, this would sort products
            }
        });
        
        // Filter functionality
        document.getElementById('filterSelect').addEventListener('change', function() {
            if (this.value !== '') {
                alert(`Filtering by: ${this.options[this.selectedIndex].text}`);
                // In a real application, this would filter products
            }
        });
        
        // Group functionality
        document.getElementById('groupSelect').addEventListener('change', function() {
            if (this.value !== '') {
                alert(`Grouping by: ${this.options[this.selectedIndex].text}`);
                // In a real application, this would group products
            }
        });