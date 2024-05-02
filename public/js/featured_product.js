  
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
    // Parse the JSON respons
    return response.json();
  })
  .then(data => {
    // Data processing logic goes here
    console.log('Data received:', data);
    // Call a function to handle the received data
    console.log('line 64');
    console.log(data);

    const container = document.querySelector('.row.featured__filter');
    container.innerHTML = '';
    data = data.products;
    // Loop through the data and create HTML elements for each product
    data.forEach((product) => {
      const col = document.createElement('div');
      //col.className = 'col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat vegetables fastfood';
      col.className = `col-lg-3 col-md-4 col-sm-6 mix ${product.status}`;


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
      liCart.innerHTML = `<a id='addToCart}href="#"><i class="fa fa-shopping-cart"></i></a>`;
  
      ul.appendChild(liHeart);
      ul.appendChild(liRetweet);
      ul.appendChild(liCart);
  
      featuredItemPic.appendChild(ul);
  
      const featuredItemText = document.createElement('div');
      featuredItemText.className = 'featured__item__text';
      featuredItemText.innerHTML = `
        <h6><a href="#">${product.productName}</a></h6>
        <h5>$${product.price}</h5>
      `;
  
      featuredItem.appendChild(featuredItemPic);
      featuredItem.appendChild(featuredItemText);
  
      col.appendChild(featuredItem);
  
      container.appendChild(col);
    });
    //populateProducts(data);
  }).catch(error => {
    // Error handling
   // console.log(data);
    console.error('There was a problem with the fetch operation:', error);
  });
  
  /*
  // Function to populate products
  function populateProducts(data) {
    console.log(data);
    const prod = data.products;
    console.log(prod);
    console.log(typeof prod);
    const container = document.querySelector('.row.featured__filter');
  
    // Clear existing content
    container.innerHTML = '';
  
    // Loop through the data and create HTML elements for each product
    prod.forEach((product) => {
      const col = document.createElement('div');
      //col.className = 'col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat vegetables fastfood';
      col.className = `col-lg-3 col-md-4 col-sm-6 mix ${product.status}`;


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
      liCart.innerHTML = '<a href="#"><i class="fa fa-shopping-cart"></i></a>';
  
      ul.appendChild(liHeart);
      ul.appendChild(liRetweet);
      ul.appendChild(liCart);
  
      featuredItemPic.appendChild(ul);
  
      const featuredItemText = document.createElement('div');
      featuredItemText.className = 'featured__item__text';
      featuredItemText.innerHTML = `
        <h6><a href="#">${product.productName}</a></h6>
        <h5>$${product.price}</h5>
      `;
  
      featuredItem.appendChild(featuredItemPic);
      featuredItem.appendChild(featuredItemText);
  
      col.appendChild(featuredItem);
  
      container.appendChild(col);
    });
  }
  
  // Call the function to populate products
populateProducts();*/