const form = document.querySelector('#add_products_form'); // Use '#' to select by ID
form.addEventListener('submit', function(event) { // 'submit' is the event name, 'onsubmit' is not needed
    
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Retrieve form field values
  const productName = form.querySelector('#name').value;
  const description = form.querySelector('#description').value;
  const category = form.querySelector('#category').value;
  const expireDate = form.querySelector('#expire_date').value;
  const stock = form.querySelector('#stock').value; 

  var accesToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaWtvMzMxQGdtYWlsLmNvbSIsImlhdCI6MTcxNDI3OTU0MCwiZXhwIjoxNzE0Mjc5NTcwfQ.8OtyIUOI22y3jYRdxqzcFOyTCN_gw5kq90_oMqrChs0';
    var refressToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaWtvMzMxQGdtYWlsLmNvbSIsImlhdCI6MTcxNDI3OTU0MCwiZXhwIjoxNzE0MzY1OTQwfQ.W-57keICEscWmAyXVtwse0_Cw8A5uuctdllLQoPF90Y';

// Put the fetch code here
fetch("http://localhost:3500/products", {
  credentials: "include", // Include cookies with the request
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${accesToken}`, // Include access token
    //   'Refresh-Token': refressToken 
  },
 // body: JSON.stringify({ productName, description, category, expireDate, stock})
 body: JSON.stringify({ productName: 'Glass', category: 'New Arrival', hearts: '10000', price: '600000'})

})
  .then(response => {
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error('Network response was not ok',response.status);
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Data processing logic goes here
    console.log('Data received:', data);
    // Call a function to handle the received data
    populateProducts(data); 
  })
  .catch(error => {
    // Error handling
    console.error(`There was a problem with the fetch operation: ${error}`);
  });

// Function to populate products
function populateProducts(data) {
  // Your logic to populate products goes here
}


});