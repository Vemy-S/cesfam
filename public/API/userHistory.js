async function getUserHistory (){
    try {
        const response = await fetch('http://127.0.0.1:4000/api/userhistory', {
            method: 'GET',
            credentials: 'same-origin'
        })

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}

getUserHistory().then(data => {
    if (data) {
        const historyBody = document.querySelector('.history-body');

        if (historyBody) {
            const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.reservation_date}</td>
                    <td>${data.medicalhour_time}</td>
                    <td>${data.reservation_description}</td>
                `;
                historyBody.appendChild(row);
        } 
    }
});