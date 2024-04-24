document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const rut = document.getElementById('user_rut').value;
    const uniqueKey = document.getElementById('user_uniquekey').value;

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
             const token = data.token;
            localStorage.setItem('token', token);
            console.log(token, 'token')
            
           
            console.log('Login successful');
            console.log(data); 

            window.location.href = data.redirectToIndex;
        } else {
         
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});     