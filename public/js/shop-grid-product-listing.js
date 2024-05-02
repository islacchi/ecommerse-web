// Sample database response
const productsData = [
    { 
        imageUrl: "img/latest-product/lp-1.jpg", 
        productName: "Nikko Cutie ryzen 5 desktop", 
        price: "$30.00",
        category: "desktop",
        brand:"acer"
    },
    { 
        imageUrl: "img/latest-product/king baldwin.jpeg",  
        productName: "king carloes", 
        price: "$30.00",
        category: "laptop",
        brand:"xiaomi"
    },
    { 
        imageUrl: "img/featured/feature-1.jpg",  
        productName: "Urgh printer", 
        price: "$30.00",
        category: "printer",
        brand:"dell",
    },
    // Add more objects for additional products if needed
];

// Function to create product HTML elements
function createProductElement(product) {
    // Create a new product item container
    const productItem = document.createElement('div');
    productItem.className = 'col-lg-4 col-md-6 col-sm-6';

    // Populate product item HTML with data
    productItem.innerHTML = `
        <div class="product__item">
            <!-- Product image -->
            <div class="product__item__pic set-bg" style="background-image: url('${product.imageUrl}')">
                <!-- Product action buttons -->
                <ul class="product__item__pic__hover">
                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                    <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                    <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
            <!-- Product details -->
            <div class="product__item__text">
                <h6><a href="#">${product.productName}</a></h6>
                <h5>${product.price}</h5>
            </div>
        </div>
    `;

    return productItem;
}

// Function to populate products in the DOM
function populateProducts(products) {
    // Sort products by name
    products.sort((a, b) => a.productName.localeCompare(b.productName));

    // Get the container for product items
    const productRow = document.getElementById('productrow');

    // Clear existing content
    productRow.innerHTML = '';

    // Loop through the data and create HTML elements for each product
    products.forEach(product => {
        const productItem = createProductElement(product);
        // Append each product item to the container
        productRow.appendChild(productItem);
    });

    // Update the product counter
    const productCountSpan = document.getElementById('productCount');
    productCountSpan.textContent = products.length;
}


// ACER brand
document.querySelector('#productBrandAcer').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'acer');
    populateProducts(laptopProducts);
});

// APPLE brand
document.querySelector('#productBrandApple').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'apple');
    populateProducts(laptopProducts);
});

// ASUS brand
document.querySelector('#productBrandAsus').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'asus');
    populateProducts(laptopProducts);
});

// DELL brand
document.querySelector('#productBrandDell').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'dell');
    populateProducts(laptopProducts);
});

// HP brand
document.querySelector('#productBrandHp').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'hp');
    populateProducts(laptopProducts);
});

// Huawei brand
document.querySelector('#productBrandHuawei').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'huawei');
    populateProducts(laptopProducts);
});

// INTEL brand
document.querySelector('#productBrandIntel').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'intel');
    populateProducts(laptopProducts);
});

// LENOVO brand
document.querySelector('#productBrandLenovo').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'lenovo');
    populateProducts(laptopProducts);
});

// MSI brand
document.querySelector('#productBrandMsi').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'msi');
    populateProducts(laptopProducts);
});

// RYZEN brand
document.querySelector('#productBrandRyzen').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'ryzen');
    populateProducts(laptopProducts);
});

// XIAOMI brand
document.querySelector('#productBrandXiaomi').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const laptopProducts = productsData.filter(product => product.brand === 'xiaomi');
    populateProducts(laptopProducts);
});


// Function to handle click event on all products link
document.querySelector('#allProductsLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    populateProducts(productsData);
});

// Call the function to populate products when the page loads
populateProducts(productsData);
