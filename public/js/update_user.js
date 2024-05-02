function updateUser(){

//document.getElementById('updateUserForm').addEventListener('submit', function(event) {
//    event.preventDefault(); // Prevent form submission

    // Get input values
    const email = document.getElementById('email').value;
    const username = document.getElementById('name').value;
    const selectUser = document.getElementById('listAccounts');
    const selectedUser = selectUser.options[selectUser.selectedIndex].text;

    // Send update user request to server
    console.log('line 9');
    fetch('http://localhost:3500/updateUser', {
        method: 'POST',
        headers: {
            'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, selectedUser })
    })
    .then(response => {
      /*  if (!response.ok) {
            document.getElementById('message').innerText = "Invalid Email and Password";
            throw new Error('Failed to login');
        }*/
        return response.json();
    })
    .then(data => {
     
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
//});


}


function deleteUser(){

    //document.getElementById('updateUserForm').addEventListener('submit', function(event) {
    //    event.preventDefault(); // Prevent form submission
    
        // Get input values
        const email = document.getElementById('email').value;
        const username = document.getElementById('name').value;
        const selectUser = document.getElementById('listAccounts');
        const selectedUser = selectUser.options[selectUser.selectedIndex].text;
    
        // Send update user request to server
        console.log('line 9');
        fetch('http://localhost:3500/deleteUser', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer "+localStorage.getItem("accessTokenAdmin"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, selectedUser })
        })
        .then(response => {
          /*  if (!response.ok) {
                document.getElementById('message').innerText = "Invalid Email and Password";
                throw new Error('Failed to login');
            }*/
            return response.json();
        })
        .then(data => {
         
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    //});
    
    
    }