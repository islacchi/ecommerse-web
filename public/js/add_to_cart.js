document.addEventListener('DOMContentLoaded', function() {
const liCart = document.getElementById('addToCart');

function add(liCart){
const anchorElement = document.getElementById('addToCart'); 

if(anchorElement){
const nameAttributeValue = anchorElement.name;
anchorElement.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior
  // Perform POST fetch operation
  fetch("http://localhost:3500/cart", {
    credentials: "include",
    method: "POST",
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
    alert("done");
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
liCart.appendChild(anchorElement);
}else{
  console.log("no name found");
}
};

add(liCart);
});