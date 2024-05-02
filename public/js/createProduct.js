
const form = document.querySelector('#add_products_form');// Use '#' to select by ID
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const productName = form.querySelector('#name').value;
    const description = form.querySelector('#description').value;
    const category = form.querySelector('#category').value;
    const expireDate = form.querySelector('#expire_date').value;
    const stock = parseInt(form.querySelector('#stock').value); 
    //console.log(parseInt(stock));

    const myInput = document.getElementById('fileInput');
        let formData = new FormData();
        formData.append('proad', myInput.files[0]);
fetch('http://localhost:3500/createprod', {
  method: 'POST',
  credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
        }, 
  body: formData,
}).then(response => {
    return response.json();
})
.then(data => {
  if(data.success == false){
    console.log(data.message);
    window.location.href = '/admin';
  }else{
    console.log(data);
  }
})
.catch(error => {
    console.error('Error:', error);
});


fetch('http://localhost:3500/writeData', {
  method: 'POST',
  credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
          'Content-Type': 'application/json',
        }, 
  body: JSON.stringify({
        "prodname" : productName,
        "id"       : 9,
        "category" : category,
        "desc"     : description,
        "stock"    : stock,
        "price"    : 10,
        "status"   : "none",
        "url"      : "/img/product/"+myInput.files[0].name,
  })
}).then(response => {
    return response.json();
})
.then(data => {
  if(data.success == false){
    console.log(data.message);
    window.location.href = '/admin';
  }else{
    console.log(data);
  }
    
})
.catch(error => {
    console.error('Error:', error);
});

});