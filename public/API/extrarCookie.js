// Función para obtener el valor de una cookie por su nombre
function getCookie(token) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Si la cookie tiene el nombre que buscamos
        if (cookie.startsWith(token + '=')) {
            // Retornar el valor de la cookie
            return cookie.substring(token.length + 1);
        }
    }
    // Si no se encontró la cookie
    return null;
}

// Obtener el token de la cookie llamada "token"
const token = getCookie('token');

// Verificar si se encontró el token
if (token) {
    // El token se encontró, puedes usarlo como lo necesites
    console.log('Token:', token);
    // Aquí puedes realizar cualquier otra acción que necesites con el token
} else {
    // No se encontró el token, probablemente el usuario no ha iniciado sesión
    console.log('No se encontró el token');
}
