
let key=null;
function fillData(data,text){
    key=text;
    let name = document.getElementById('name');
    let description = document.getElementById('description');
    let stock = document.getElementById('stock');


    name.value = data.productName;
    description.innerText = data.description;
    stock.value = data.stock;

   let img = document.getElementById('uploadedImage');
   img.src = data.imageUrl;

}

const form = document.querySelector('#add_products_form');// Use '#' to select by ID
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const productName = form.querySelector('#name').value;
    const description = form.querySelector('#description').value;
    //const category = form.querySelector('#category').value;
    //const expireDate = form.querySelector('#expire_date').value;
    const stock = parseInt(form.querySelector('#stock').value); 
    //console.log(parseInt(stock));

    const myInput = document.getElementById('fileInput');
    if(myInput.files[0] !== undefined) {
        
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
    }
let content = null;
if(myInput.files[0] == undefined){
    content = JSON.stringify({
        "key"      : key,
        "prodname" : productName,
        "id"       : 9,
        "category" : "category",
        "desc"     : description,
        "stock"    : stock,
        "price"    : 10,
        "status"   : "none",
  });

}else{
    content = JSON.stringify({
        "key"      : key,
        "prodname" : productName,
        "id"       : 9,
        "category" : "category",
        "desc"     : description,
        "stock"    : stock,
        "price"    : 10,
        "status"   : "none",
        "url"      : "/img/product/"+myInput.files[0].name,
  });
}



fetch('http://localhost:3500/updateproddata', {
  method: 'POST',
  credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
          'Content-Type': 'application/json',
        }, 
  body: content
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