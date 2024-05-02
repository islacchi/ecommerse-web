
 document.getElementById('deleteAccountBtn').addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        var email = document.getElementById('email').value;

        // Send request to the server through an API
        fetch('http://localhost:3500/accounts', {
            credentials: "include",
            method: 'POST', // or 'DELETE', 'PUT', etc. depending on the API endpoint
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers as needed
            },
            // Add any request body if required (e.g., data to be sent to the server)
            body: JSON.stringify({
                // Add any data to be sent to the server
                email
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the server responds with JSON data
        })
        .then(data => {
            // Handle the response data if needed
            console.log(data);
            alert("Account deleted");
            // Optionally, perform any actions based on the response (e.g., show a success message)
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            // Optionally, handle errors (e.g., display an error message)
        });
    });
 