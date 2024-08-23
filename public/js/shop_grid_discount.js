// Function to fetch products data from the server
function fetchProductsData() {
    fetch('http://localhost:3500/products', {
        credentials: "include",
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("accessToken"),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data.products)) {
            throw new Error('Products data is not an array');
        }
        populateDiscountItems(data.products);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to populate the discount items in the DOM
function populateDiscountItems(products) {
    const discountSlider = document.querySelector('.product__discount__slider');
    discountSlider.innerHTML = ''; // Clear existing content

    // Loop through the products and create HTML elements for each product
    products.forEach(product => {
        const discountItem = createDiscountItem(product);
        discountSlider.appendChild(discountItem);
    });
}

// Function to create a discount item HTML element
function createDiscountItem(product) {
    // Create a new discount item container
    const discountItem = document.createElement('div');
    discountItem.className = 'col-lg-4';

    // Populate discount item HTML with product data
    discountItem.innerHTML = `
        <div class="product__discount__item">
            <div class="product__discount__item__pic set-bg" data-setbg="${product.imageUrl}">
                <div class="product__discount__percent">-20%</div>
                <ul class="product__item__pic__hover">
                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                    <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                    <li id="liCart${product._id}"></li>
                </ul>
            </div>
            <div class="product__discount__item__text">
                <span>${product.category}</span>
                <h5><a href="#">${product.productName}</a></h5>
                <div class="product__item__price">
                    $${product.discountPrice} <span>$${product.originalPrice}</span>
                </div>
            </div>
        </div>
    `;

    // Call add function to attach add-to-cart functionality
    add(discountItem.querySelector(`#liCart${product._id}`), product._id);

    return discountItem;
}

// Function to add add-to-cart functionality
function add(liCart, productId) {
    const anchorElement = document.createElement('a');
    anchorElement.href = '#';
    anchorElement.className = 'add-to-cart';
    anchorElement.dataset.productId = productId;
    
    const iconElement = document.createElement('i');
    iconElement.className = 'fa fa-shopping-cart';
    
    anchorElement.appendChild(iconElement);
    liCart.appendChild(anchorElement);
  
    anchorElement.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const productId = event.target.dataset.productId;
        // Perform POST fetch operation
        fetch("http://localhost:3500/cart", {
            method: "POST",
            credentials: "include",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json' // Specify JSON content type
            },
            body: JSON.stringify({
                productId: productId
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle response data if needed
            console.log(data);
            alert("Item added to cart");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

// Call the fetchProductsData function to start fetching and populating the discount items
fetchProductsData();
