document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const rut = document.getElementById('user_rut').value;
    const uniqueKey = document.getElementById('pwd').value;

    try {
        const response = await fetch('http://127.0.0.1:4000/api/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_rut: rut,
                user_uniquekey: uniqueKey
            }),
            credentials: 'include'
        });

        const data = await response.json();
        
        if (response.ok) {

            localStorage.setItem('token', data.token);
           
            console.log('Login successful');
            console.log(data); 

            window.location.href = data.redirectToIndex;
        } else {
            
            const messageElement = document.getElementById('message');


            if(data.message === 'User already logged in'){
                messageElement.innerText = 'Ya existe una sesión activa';
            }

            if(data.message === 'Rut or password is invalid'){
                messageElement.innerText = 'Datos incorrectos';
        

            }

            // Mostrar el mensaje
            messageElement.style.display = 'block';


            // desaparece después de 3 segundos
            setTimeout(() => {
                messageElement.style.display = 'none';
                messageElement.innerText = ''; 
            }, 3000);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});     