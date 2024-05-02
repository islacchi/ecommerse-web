// Assuming data is an array of objects containing information for each product
// Example data structure:
const data = [
    { 
      imageUrl: "img/featured/feature-1.jpg", 
      productName: "Crab Pool Security", 
      price: "$30.00",
      status: "hot",

    },
    { 
      imageUrl: "img/featured/feature-2.jpg", 
      productName: "Product 2", 
      price: "$25.00",
      status: "limited",

    },
    { 
        imageUrl: "img/featured/feature-1.jpg", 
        productName: "Crab Pool Security", 
        price: "$30.00",
        status: "sale",

      },
      { 
        imageUrl: "img/featured/feature-2.jpg", 
        productName: "Product 2", 
        price: "$25.00",
        status: "bundle",

      },
      { 
        imageUrl: "img/featured/feature-1.jpg", 
        productName: "Crab Pool Security", 
        price: "$30.00",
        status: "hot",

      },
      { 
        imageUrl: "img/featured/feature-2.jpg", 
        productName: "Product 2", 
        price: "$25.00",
        status: "sale",

      },
      
    // Add more objects for additional products
  ];
  
  // Function to populate products
  function populateProducts() {
    const container = document.querySelector('.row.featured__filter');
  
    // Clear existing content
    container.innerHTML = '';
  
    // Loop through the data and create HTML elements for each product
    data.forEach(product => {
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
        <h5>${product.price}</h5>
      `;
  
      featuredItem.appendChild(featuredItemPic);
      featuredItem.appendChild(featuredItemText);
  
      col.appendChild(featuredItem);
  
      container.appendChild(col);
    });
  }
  
  // Call the function to populate products
  populateProducts();
  