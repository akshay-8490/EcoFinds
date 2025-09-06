// Image upload functionality
        const imageUpload = document.getElementById('imageUpload');
        const fileInput = document.getElementById('fileInput');
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = imagePreview.querySelector('img');
        
        imageUpload.addEventListener('click', () => {
            fileInput.click();
        });
        
        imageUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUpload.style.borderColor = '#4a6cf7';
            imageUpload.style.backgroundColor = '#f8faff';
        });
        
        imageUpload.addEventListener('dragleave', () => {
            imageUpload.style.borderColor = '#cbd5e0';
            imageUpload.style.backgroundColor = 'transparent';
        });
        
        imageUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUpload.style.borderColor = '#cbd5e0';
            imageUpload.style.backgroundColor = 'transparent';
            
            const file = e.dataTransfer.files[0];
            handleImage(file);
        });
        
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            handleImage(file);
        });
        
        function handleImage(file) {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    imagePreview.style.display = 'block';
                }
                
                reader.readAsDataURL(file);
            }
        }
        
        // Form validation
        document.getElementById('productForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const productTitle = document.getElementById('productTitle').value;
            const productCategory = document.getElementById('productCategory').value;
            const productDescription = document.getElementById('productDescription').value;
            const price = document.getElementById('price').value;
            const quantity = document.getElementById('quantity').value;
            const condition = document.getElementById('condition').value;
            
            if (!productTitle || !productCategory || !productDescription || !price || !quantity || !condition) {
                alert('Please fill in all required fields');
                return;
            }
            
            // If validation passes
            alert('Product added successfully!');
            this.reset();
            imagePreview.style.display = 'none';
        });
        
        // Add unit labels to dimension fields
        const lengthInput = document.getElementById('length');
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        
        [lengthInput, widthInput, heightInput].forEach(input => {
            input.addEventListener('focus', function() {
                this.placeholder = '0.00 cm';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.placeholder = this.id.charAt(0).toUpperCase() + this.id.slice(1);
                }
            });
        });