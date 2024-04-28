document.addEventListener('DOMContentLoaded', function() {
  // Tu código aquí



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
      const profileName = document.querySelector('h2');
      profileName.textContent = data.name;
  
      const chipsList = document.querySelector('.chips');
      chipsList.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos datos
  
      const rutItem = document.createElement('li');
      rutItem.classList.add('chip');
      rutItem.textContent = `Rut: ${data.rut}`;
      chipsList.appendChild(rutItem);
  
      const emailItem = document.createElement('li');
      emailItem.classList.add('chip');
      emailItem.textContent = `Email: ${data.user_email}`;
      chipsList.appendChild(emailItem);
  
      const adressItem = document.createElement('li');
      adressItem.classList.add('chip');
      adressItem.textContent = `Direccion: ${data.user_address}`;
      chipsList.appendChild(adressItem);
  
      const hoursItem = document.createElement('li');
      hoursItem.classList.add('chip');
      hoursItem.textContent = `Horas pedidas: ${data.user_counthours}`;
      chipsList.appendChild(hoursItem);
  
      const phoneItem = document.createElement('li');
      phoneItem.classList.add('chip');
      phoneItem.textContent = `Telefono: ${data.user_phone}`;
      chipsList.appendChild(phoneItem);

      const birthDate = document.createElement('li');
      birthDate.classList.add('chip');
      birthDate.textContent = `Nacimiento: ${data.user_birthdate}`;
      chipsList.appendChild(birthDate);


      console.log(data)
      const cesfamName = document.querySelector('.cesfam-name');
      cesfamName.textContent = data.cesfam_name; 



      const cesfamPhone = document.querySelector('.cesfam-phone')
      cesfamPhone.classList.add('chip')
      cesfamPhone.textContent = `Telefono: ${data.cesfam_phone}`

      const cesfamAddress = document.querySelector('.cesfam-address')
      cesfamAddress.classList.add('chip')
      cesfamAddress.textContent = `Telefono: ${data.cesfam_address}`
  

      
    }
  });
});