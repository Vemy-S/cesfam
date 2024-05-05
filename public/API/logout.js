const logoutButton = document.getElementById('logoutButton');


logoutButton.addEventListener('click', async () => {
    try {
        console.log("Haciendo solicitud de logout al servidor...");
      
        const response = await fetch('http://127.0.0.1:4000/api/logout', {
            method: 'POST',
            credentials: 'same-origin'
        });

        console.log("Respuesta del servidor:", response);

        if (response.ok) {
           
            console.log("La sesión se cerró correctamente.");
            window.location.href = 'login.html'; 
        } else {
        
            console.error('Error al cerrar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
});