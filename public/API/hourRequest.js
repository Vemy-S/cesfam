async function getHours() {
    try {
        const response = await fetch('http://127.0.0.1:4000/api/infohour', {
            method: 'GET',
            credentials: 'same-origin'
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const data = await getHours();
        const row = document.querySelector('.row.row-cols-1.row-cols-md-3.g-4.py-5');
      

        if (data && data.responseData.length > 0) {
            data.responseData.forEach((hourData, index) => {
                const container = document.createElement('div');
                container.classList.add('col');

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                const img = document.createElement('img');
                img.src = '/img/doctor1.webp';
                img.classList.add('card-img-top');
                img.alt = '...';

                const cardBodyDiv = document.createElement('div');
                cardBodyDiv.classList.add('card-body');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = 'Medicina General';

                const doctorName = document.createElement('p');
                doctorName.classList.add('card-text', 'doctor-name');
                doctorName.textContent = `Nombre: ${hourData.doctor_fullname}`;

                const hour = document.createElement('h3');
                hour.classList.add('hour');
                hour.textContent = hourData.medicalhour_time;

                const button = document.createElement('button');
                button.classList.add('btn', 'btn-primary');
                button.textContent = 'Reservar';

                button.addEventListener('click', () => {
                    openModal(hourData.medicalhour_time, hourData.medicalhour_id);
                });

                const dFlexDiv = document.createElement('div');
                dFlexDiv.classList.add('mb-5', 'd-flex', 'justify-content-around');

                dFlexDiv.appendChild(hour);
                dFlexDiv.appendChild(button);

                cardBodyDiv.appendChild(title);
                cardBodyDiv.appendChild(doctorName);
                cardBodyDiv.appendChild(dFlexDiv);

                cardDiv.appendChild(img);
                cardDiv.appendChild(cardBodyDiv);

                container.appendChild(cardDiv);
                row.appendChild(container);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function openModal(hour, id) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(modalBackdrop);

    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade', 'show');
    modal.tabIndex = '-1';
    modal.role = 'dialog';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Reservar Cita</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Hora Seleccionada: ${hour}</p>
                    <form id="reservationForm">
                        <div class="mb-3">
                            <label for="description" class="form-label">Descripción</label>
                            <textarea class="form-control" id="description" rows="3"></textarea>
                        </div>
                        <input type="hidden" id="id" value="${id}">
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>`;
    
    document.body.appendChild(modal);

    const form = document.getElementById('reservationForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const id = document.getElementById('id').value;
        sendDataToBackend({ description, hour, id });
        closeModal(modal, modalBackdrop);
        const valdesc = description.value.trim();
            if (valdesc === '') {
                alert('Por favor, introduce texto en el cuadro de texto.');
                description.focus(); 
            } else {
                alert('Texto válido: ' + valdesc);
            }
    });

    modal.querySelector('.btn-close').addEventListener('click', () => {
        closeModal(modal, modalBackdrop);
    });
}

function closeModal(modal, modalBackdrop) {
    modal.remove();
    modalBackdrop.remove();
}

async function sendDataToBackend(data) {
    try {
        console.log(data)
        const response = await fetch('http://127.0.0.1:4000/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                medicalhour_id: data.id,
                medicalhour_time: data.hour,
                reservation_description: data.description
            })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok => Quizas ya tiene hora o la hora esta ocupada.`);
        }
        const responseData = await response.json();
        console.log(`Response from backend: ${responseData}`);
    } catch (error) {
        console.error(`Error: ${error}`,);
    }
}