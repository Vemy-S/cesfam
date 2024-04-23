
async function getUserInfo() {
  try {
      const response = await fetch('http://127.0.0.1:4000/api/userinfo', {
          method: 'GET',
          credentials: 'same-origin' // => Recibe Cookies
      });

      const data = await response.json();
      return data; 
  } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      return null; 
  }
}

getUserInfo().then(data => {
  if (data) {
      document.querySelector('.user-info h1').textContent = `RUT: ${data.rut} Nombre: ${data.fullname}, Email: ${data.user_email}, ${data.cesfam_name}`;
  }
});
