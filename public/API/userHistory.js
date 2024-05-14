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
    const historyTableBody = document.querySelector('.history-table tbody');
  
    console.log(data); // Verifica que data sea un array de objetos en la consola
  
    if (historyTableBody) {
      data.forEach(item => { // Itera sobre cada objeto en el array
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.reservation_date}</td>
          <td>${item.medicalhour_time}</td>
          <td>${item.reservation_description}</td>
        `;
        historyTableBody.appendChild(row);
      });
    }
  });
