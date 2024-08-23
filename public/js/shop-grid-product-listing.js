// Sample database response
let productsData = [];

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
    console.log('Data from server:', data); // Log the data from the server
    if (!Array.isArray(data.products)) {
        throw new Error('Products data is not an array');
    }
    // Limiting the number of products to a maximum of three
    productsData = data.products.slice(0, 3);
    console.log('Latest products:', productsData); // Log the latest products data
    populateProducts(productsData); // Call the function to populate products after fetching data
})
.catch(error => {
    console.error('Error:', error);
});

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
                    <li id="liCart"></li> <!-- Placeholder for cart icon -->
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
        add(productItem.querySelector('#liCart'), product._id); // Call add function to attach add-to-cart functionality
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

//Add to cart code
function add(liCart, productId){
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
          'Authorization': "Bearer "+localStorage.getItem("accessToken"),
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
