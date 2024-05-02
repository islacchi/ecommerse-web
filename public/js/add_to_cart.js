
const anchorElement = document.getElementById('addToCart');
const nameAttributeValue = anchorElement.getAttribute('name');
anchorElement.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior
  // Perform POST fetch operation
  fetch("http://localhost:3500/cart", {
    credentials: "include",
    headers: {
      'Authorization': "Bearer "+localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      // Your data to be sent in the request body
      // Example: { key: value }
      productId: nameAttributeValue
    })
  })
  .then(response => response.json())
  .then(data => {
    // Handle response data if needed
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
liCart.appendChild(anchorElement);
