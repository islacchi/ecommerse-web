/************************
Passwors checking if it match
******************/

var passwordOk = false;
var captchaOk = false;
document.getElementById('confirmPasswordSignup').addEventListener('input', function(event) {

    


    const password = document.getElementById('passwordSignup').value.trim();
    const confirmPassword = event.target.value.trim(); // Use event.target.value to get the value of the confirm password field

    const confirmPasswordField = document.getElementById('confirmPassword');
    const confirmPasswordMessage = document.getElementById('confirmPasswordMessage');

    if (confirmPassword !== password) {
        passwordOk = false;
        confirmPasswordMessage.style.color = 'red';
        confirmPasswordMessage.innerText = 'Passwords do not match';
    } else {
        confirmPasswordMessage.style.borderColor = ''; // Reset border color
        confirmPasswordMessage.innerText = ''; // Clear error message
        passwordOk = true;
    }
});

 
    document.getElementById('signupButton').disabled = false;
document.getElementById('signupForm').addEventListener('submit', function(event){
    event.preventDefault();
    const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse.length > 0) {
            throw new Error(alert("Captcha not complete"));
        }

  if(passwordOk){

    const username = document.getElementById('usernameSignup').value;
    const password = document.getElementById('passwordSignup').value;
    
   fetch('http://localhost:3500/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": username,
                        "password": password,
                        "roles": "User",
                    })
   })
   .then(response =>{
    if(!response.ok){
    document.getElementById('signupMessage').innerText = "Something went wrong. Try again."
    throw new Error("Signup Faild");  
   }
   return response.json();
}).then(data =>{
    if(data.success == true){
        document.getElementById('signupMessage').textContent = "Signup Complete. Proceed to Login"
        //window.location.href = 'sign-in.ejs';
        loginBtn.onclick();
    }
})
.catch(error =>{
   // console.error("Error: ", error);
})
};
})
 