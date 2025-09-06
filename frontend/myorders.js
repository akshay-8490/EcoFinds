// Search functionality
        const searchInput = document.querySelector('.search-input');
        const orderCards = document.querySelectorAll('.order-card');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            orderCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Control buttons functionality
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                alert(`${this.querySelector('span').textContent} options would appear here.`);
            });
        });
        
        // Action buttons functionality
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.closest('.order-card').querySelector('.order-id').textContent;
                alert(`Viewing details for ${orderId}`);
            });
        });
        
        document.querySelectorAll('.btn-reorder').forEach(btn => {
            btn.addEventListener('click', function() {
                const productName = this.closest('.order-card').querySelector('.product-name').textContent;
                alert(`Adding ${productName} to your cart for reorder.`);
            });
        });