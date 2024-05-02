const latestProductsData = [
    { 
      imageUrl: "img/latest-product/lp-1.jpg", 
      productName: "Carrot", 
      price: "$30.00"
    },
    { 
      imageUrl: "img/latest-product/lp-2.jpg", 
      productName: "Adobo", 
      price: "$25.00"
    },
    { 
      imageUrl: "img/latest-product/lp-3.jpg", 
      productName: "Orange", 
      price: "$35.00"
    }
    // Add more objects for additional latest products if needed
];

// Sample data array for top-rated products
const topRatedProductsData = [
    { 
      imageUrl: "img/latest-product/lp-1.jpg", 
      productName: "Seeds", 
      price: "$40.00"
    },
    { 
      imageUrl: "img/latest-product/lp-1.jpg", 
      productName: "Laptop", 
      price: "$45.00"
    },
    { 
      imageUrl: "img/latest-product/lp-1.jpg", 
      productName: "Cellphone", 
      price: "$50.00"
    }
    // Add more objects for additional top-rated products if needed
];

const reviewProductsData = [
    { 
      imageUrl: "img/latest-product/lp-1.jpg", 
      productName: "Review product 1", 
      price: "$40.00"
    },
    { 
      imageUrl: "img/latest-product/lp-1.jpg", 
      productName: "Review product 1", 
      price: "$45.00"
    },
    { 
      imageUrl: "img/latest-product/lp-1.jpg", 
      productName: "Review product 1", 
      price: "$50.00"
    }
    // Add more objects for additional top-rated products if needed
];
// Function to populate products
// Function to populate products
function populateProducts() {
    const productSections = document.querySelectorAll('.latest-product__text');

    productSections.forEach(section => {
        const heading = section.querySelector('h4');

        if (heading) {
            const headingText = heading.textContent.trim();
            const slider = section.querySelector('.latest-product__slider');
            const productsData = headingText === 'Latest Products' ? latestProductsData : headingText === 'Top Rated Products' ? topRatedProductsData : headingText === 'Review Products' ? reviewProductsData : null;

            if (productsData && slider) {
                // Clear existing content
                slider.innerHTML = '';
                // Loop through the data and create HTML elements for each product
                productsData.forEach(product => {

                    const productLink = document.createElement('a');
                    productLink.href = '#';
                    productLink.className = 'latest-product__item';

                    const productPic = document.createElement('div');
                    productPic.className = 'latest-product__item__pic';
                    const img = document.createElement('img');
                    img.src = product.imageUrl;
                    img.alt = 'Product Image';
                    productPic.appendChild(img);

                    const productText = document.createElement('div');
                    productText.className = 'latest-product__item__text';
                    productText.innerHTML = `
                        <h6>${product.productName}</h6>
                        <span>${product.price}</span>
                    `;

                    productLink.appendChild(productPic);
                    productLink.appendChild(productText);

                    slider.appendChild(productLink);
                });
            } else {
                console.error('Products data or slider not found for section:', section);
            }
        } else {
            console.error('No heading element found for section:', section);
        }
    });
}

// Call the function to populate products
populateProducts();

