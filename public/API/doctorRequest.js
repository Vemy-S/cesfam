document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log('Conecto')

    const rut = document.getElementById('doctor_rut').value;
    const password = document.getElementById('doctor_password').value;

    try {
        const response = await fetch('http://127.0.0.1:4000/api/logindoctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doctor_rut: rut,
                doctor_password: password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            
            console.log('Login successful');
<<<<<<< HEAD:views/API/doctorRequest.js
            console.log(data); // You may handle the response data here

            window.location.href = "http://127.0.0.1:5501/views/auth/index.html"
=======
            console.log(data); 

            window.location.href = "http://127.0.0.1:5501/views/home/doctor.html"
>>>>>>> fcff4e1f504eba07dd6c605c47327e92bbce6003:public/API/doctorRequest.js
        } else {
    
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});