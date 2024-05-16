const pwdInput = document.getElementById('pwd');
const showBtn = document.getElementById('show');
const icon = showBtn.querySelector('i');


document.addEventListener('DOMContentLoaded', function() {
   
    showBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (pwdInput.type === 'password') {
            pwdInput.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            pwdInput.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });
});
