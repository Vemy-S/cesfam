document.addEventListener('DOMContentLoaded', async function() {
    // Obtener la referencia a la lista de horas
    const hoursList = document.getElementById('hours-list');

    // Simulación de horas disponibles (esto lo reemplazarías con tu lógica de fetching)
    const availableHours = ['09:00', '10:00', '11:00', '12:00'];

    // Limpiar la lista por si acaso hay elementos previos
    hoursList.innerHTML = '';

    // Iterar sobre el array de horas y crear elementos li para cada hora
    availableHours.forEach(hour => {
        const li = document.createElement('li');
        li.textContent = hour;
        // Agregar un evento de clic a cada hora para manejar la acción de tomar la hora
        li.addEventListener('click', function() {
            takeHour(hour);
        });
        // Agregar el elemento li a la lista
        hoursList.appendChild(li);
    });
});

// Función para simular la acción de tomar una hora (esto lo reemplazarías con tu lógica real)
function takeHour(hour) {
    console.log('Hora tomada:', hour);
    // Aquí podrías enviar una solicitud al servidor para marcar la hora como tomada
}
