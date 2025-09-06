
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        const tableRows = document.querySelectorAll('tbody tr');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            tableRows.forEach(row => {
                const productName = row.querySelector('.product-name').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
        
        // Control buttons functionality
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                alert(${this.querySelector('span').textContent} options would appear here.);
            });
        });
        
        // Action buttons functionality
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.querySelector('.fa-edit')) {
                    alert('Edit product functionality would open here.');
                } else if (this.querySelector('.fa-trash')) {
                    if (confirm('Are you sure you want to delete this listing?')) {
                        this.closest('tr').style.opacity = '0';
                        setTimeout(() => {
                            this.closest('tr').remove();
                            // Show empty state if no listings left
                            if (document.querySelectorAll('tbody tr').length === 0) {
                                document.querySelector('.listings-table').style.display = 'none';
                                document.querySelector('.empty-state').style.display = 'block';
                            }
                        }, 300);
                    }
                }
            });
        });
        
        // Add new button functionality
        document.querySelectorAll('.add-new-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Add new product form would open here.');
            });
        });
    