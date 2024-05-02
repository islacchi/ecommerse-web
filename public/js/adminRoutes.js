 
function home(){
    fetch('http://localhost:3500/home', {
        credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
        },
    })
    .then(response => {
        console.log(response.type);
        return response.json();
    })
    .then(data => {
        window.location.href = 'admin.ejs'; 
        //console.log(data);
       // document.write(data);
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
 

function prods(){
    fetch('http://localhost:3500/prods', {
        credentials: "include",
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
        },
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        window.location.href = '/products.ejs'; 
        /*console.log(data);
        document.write(data);*/
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addProds(){
    fetch('http://localhost:3500/productadd', {
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