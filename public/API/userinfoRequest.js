// userinfoRequest.js

// URL del backend donde se encuentra la información del usuario
const url = 'http://127.0.0.1:4000/api/userinfo';

// Realiza la solicitud GET al backend
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json', // Dependiendo de la API, ajusta los encabezados necesarios
    // Puedes incluir otros encabezados aquí si es necesario, como tokens de autenticación
  },
  credentials: 'include' // <-- Agregar esta línea para incluir cookies en la solicitud
})
.then(response => {
  if (!response.ok) {
    throw new Error('Error en la solicitud');
  }
  // Procesa la respuesta JSON
  return response.json();
})
.then(data => {
  // Aquí puedes hacer lo que quieras con los datos recibidos del backend
  // Por ejemplo, mostrar el nombre del usuario en el elemento <h1>
  const nombreUsuario = data.user_fullname;
  document.querySelector('.user-info h1').textContent = nombreUsuario;
})
.catch(error => {
  console.error('Hubo un problema con la solicitud fetch:', error);
});
