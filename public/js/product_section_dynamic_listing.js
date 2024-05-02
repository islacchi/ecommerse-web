let latestProductsData = [];

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
    latestProductsData = data.products.slice(0, 3);
    console.log('Latest products:', latestProductsData); // Log the latest products data
    populateProducts(); // Call the function to populate products after fetching data
})
.catch(error => {
    console.error('Error:', error);
});


// Function to populate products
function populateProducts() {
    const productSections = document.querySelectorAll('.latest-product__text');

    productSections.forEach(section => {
        const heading = section.querySelector('h4');

        if (heading) {
            const headingText = heading.textContent.trim();
            const slider = section.querySelector('.latest-product__slider');
            const productsData = headingText === 'Latest Products' ? latestProductsData : headingText === 'Top Rated Products' ? latestProductsData : headingText === 'Review Products' ? latestProductsData : null;

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