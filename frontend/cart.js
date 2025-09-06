// Quantity controls
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('.quantity-input');
                let value = parseInt(input.value);
                
                if (this.textContent === '+') {
                    input.value = value + 1;
                } else if (this.textContent === '-' && value > 1) {
                    input.value = value - 1;
                }
                
                updateCartTotal();
            });
        });
        
        // Remove items
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.cart-item').style.opacity = '0';
                setTimeout(() => {
                    this.closest('.cart-item').remove();
                    updateCartTotal();
                    updateCartCount();
                }, 300);
            });
        });
        
        // Update cart count
        function updateCartCount() {
            const count = document.querySelectorAll('.cart-item').length;
            document.querySelector('.cart-count').textContent = count;
        }
        
        // Update cart total (simplified)
        function updateCartTotal() {
            // In a real application, this would calculate based on item prices and quantities
            const totalElement = document.querySelector('.total-amount');
            totalElement.textContent = 'Rs. 17,612'; // This would be dynamically calculated
        }
        
        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            alert('Proceeding to checkout...');
        });