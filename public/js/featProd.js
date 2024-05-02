fetch("http://localhost:3500/products", {
  credentials: "include",
  headers: {
    'Authorization': "Bearer "+localStorage.getItem("accessToken"),
  },
})
  .then(response => {
    
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Data processing logic goes here
    console.log('Data received:', data);
    // Call a function to handle the received data
    console.log('line 64');
    populateProducts(data);
  })
  .catch(error => {
    // Error handling
    console.error('There was a problem with the fetch operation:', error);
  });
  
  // Function to populate products
 // Function to populate products
// Function to populate products
function populateProducts(response) {
  console.log(response); // Log the response to understand its structure

  const container = document.querySelector('.row.featured__filter');

  // Clear existing content
  container.innerHTML = '';

  // Check if the response is an object
  if (typeof response === 'object' && response !== null) {
    // Check if the response contains a 'products' property
    if (response.hasOwnProperty('products')) {
      // Extract the products array from the response object
      const products = response.products;

      // Loop through the products array
      products.forEach(product => {
        const col = document.createElement('div');
        col.className = `col-lg-3 col-md-4 col-sm-6 mix ${product.category}`;

        const featuredItem = document.createElement('div');
        featuredItem.className = 'featured__item';

        const featuredItemPic = document.createElement('div');
        featuredItemPic.className = 'featured__item__pic set-bg';
        featuredItemPic.style.backgroundImage = `url(${product.imageUrl})`;

        const ul = document.createElement('ul');
        ul.className = 'featured__item__pic__hover';

        const liHeart = document.createElement('li');
        liHeart.innerHTML = '<a href="#"><i class="fa fa-heart"></i></a>';

        const liRetweet = document.createElement('li');
        liRetweet.innerHTML = '<a href="#"><i class="fa fa-retweet"></i></a>';
        
        const liCart = document.createElement('li');
        liCart.innerHTML = `<a id="addToCart" href="#" name='${product._id}'><i class="fa fa-shopping-cart"></i></a>`;
        ul.appendChild(liHeart);
        ul.appendChild(liRetweet);
        ul.appendChild(liCart);

        featuredItemPic.appendChild(ul);

        const featuredItemText = document.createElement('div');
        featuredItemText.className = 'featured__item__text';
        featuredItemText.innerHTML = `
          <h6><a href="#">${product.productName}</a></h6>
          <h5>${product.price}</h5>
        `;

        featuredItem.appendChild(featuredItemPic);
        featuredItem.appendChild(featuredItemText);

        col.appendChild(featuredItem);

        container.appendChild(col);
      });
    } else {
      console.error('Response does not contain a "products" property:', response);
    }
  } else {
    console.error('Response is not an object:', response);
  }
}