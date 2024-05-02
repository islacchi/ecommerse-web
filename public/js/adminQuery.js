 
function qHome(){
    fetch('http://localhost:3500/admin.ejs', {
        credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        window.location.href = 'admin.ejs'; 
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function qProds(){
    fetch('http://localhost:3500/products.ejs', {
        credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
        },
    })
    .then(response => {
        return response;
    })
    .then(data => {
        window.location.href = '/products.ejs'; 
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function qAddProds(){
    fetch('http://localhost:3500/add-product.ejs', {
        credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
        },
    })
    .then(response => {
        return response;
    })
    .then(data => {
        window.location.href = '/add-product.ejs'; 
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}