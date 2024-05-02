document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

       
    
      const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse.length > 0) {
            throw new Error(alert("Captcha not complete"));
        }


    // Send login request to server
    console.log('line 9');
    fetch('http://localhost:3500/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            document.getElementById('message').innerText = "Invalid Email and Password";
            throw new Error('Failed to login');
        }
        return response.json();
    })
    .then(data => {
        // Check if login was successful
        if (data.success == true) {
            // Redirect to dashboard page
           
           const token = data.accessToken;
           const user = data.username;
           console.log(token);
           localStorage.clear();
           localStorage.setItem('accessToken', token);
           localStorage.setItem('username', user);
           window.location.href = 'index';
           //render('index.ejs');
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
});
