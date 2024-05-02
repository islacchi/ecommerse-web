document.addEventListener('DOMContentLoaded', function() {
    fetch("http://localhost:3500/products", {
      credentials: "include",
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
      populateProducts(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
    function populateProducts(response) {
      const container = document.querySelector('.row.featured__filter');
      container.innerHTML = '';
  
      if (typeof response === 'object' && response !== null && response.hasOwnProperty('products')) {
        const products = response.products;
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
  
          const liHeart = createListItem('<i class="fa fa-heart"></i>');
          const liRetweet = createListItem('<i class="fa fa-retweet"></i>');
          const liCart = createListItem(`<i class="fa fa-shopping-cart"></i>`);
          liCart.addEventListener('click', function(event) {
            event.preventDefault();
            addToCart(product._id);
          });
  
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
    }
  
    function createListItem(htmlContent) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#">${htmlContent}</a>`;
      return li;
    }
  
    function addToCart(productId) {
      fetch("http://localhost:3500/cart", {
        method: "POST",
        credentials: "include",
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ productId: productId })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Item added to cart");
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });
  