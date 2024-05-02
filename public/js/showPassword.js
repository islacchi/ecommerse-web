// // Function to toggle password visibility based on checkbox state
// function togglePasswordVisibility(checkbox, passwordInput) {
//     checkbox.addEventListener('change', function(event) {
//         if (checkbox.checked) {
//             passwordInput.setAttribute('type', 'text');
//             console.log("Password value: ", passwordInput.value);
//         } else {
//             passwordInput.setAttribute('type', 'password');
//         }
//     });
// }

// // Find show password checkboxes and handle their corresponding password inputs
// var showPasswordCheckboxes = document.querySelectorAll('#showPasswordCheckbox');
// showPasswordCheckboxes.forEach(function(checkbox) {
//     // Find the corresponding password input based on the parent container
//     var parentForm = checkbox.closest('form');
//     var passwordInputs = parentForm.querySelectorAll('input[type="password"]');
    
//     // Iterate over password inputs within the same form
//     passwordInputs.forEach(function(passwordInput) {
//         // Call the togglePasswordVisibility function for each pair
//         togglePasswordVisibility(checkbox, passwordInput);
//     });
// });

const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

// Toggle password visibility for the first password field
const togglePassword1 = document.getElementById('togglePassword1');
const password1 = document.getElementById('passwordSignup');

togglePassword1.addEventListener('click', function () {
  const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
  password1.setAttribute('type', type);

  this.classList.toggle('fa-eye-slash');
});

// Toggle password visibility for the second password field
const togglePassword2 = document.getElementById('togglePassword2');
const password2 = document.getElementById('confirmPasswordSignup');

togglePassword2.addEventListener('click', function () {
  const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type);

  this.classList.toggle('fa-eye-slash');
});
