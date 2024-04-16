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
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Login successful
            console.log('Login successful');
            console.log(data); // You may handle the response data here

            window.location.href = "http://127.0.0.1:5501/views/auth/index.html"
        } else {
            // Login failed
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});