document.addEventListener('DOMContentLoaded', function() {

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
      rutItem.classList.add('size')
      rutItem.textContent = `Rut: ${data.rut}`;
      chipsList.appendChild(rutItem);
  
      const emailItem = document.createElement('li');
      emailItem.classList.add('chip');
      emailItem.classList.add('size')
      emailItem.textContent = `Email: ${data.user_email}`;
      chipsList.appendChild(emailItem);
  
      const adressItem = document.createElement('li');
      adressItem.classList.add('chip');
      adressItem.classList.add('size')
      adressItem.textContent = `Direccion: ${data.user_address}`;
      chipsList.appendChild(adressItem);
  
      const hoursItem = document.createElement('li');
      hoursItem.classList.add('chip');
      hoursItem.classList.add('size')
      hoursItem.textContent = `Horas pedidas: ${data.user_counthours}`;
      chipsList.appendChild(hoursItem);
  
      const phoneItem = document.createElement('li');
      phoneItem.classList.add('chip');
      phoneItem.classList.add('size')
      phoneItem.textContent = `Telefono: ${data.user_phone}`;
      chipsList.appendChild(phoneItem);

      const birthDate = document.createElement('li');
      birthDate.classList.add('chip');
      birthDate.classList.add('size')
      birthDate.textContent = `Nacimiento: ${data.user_birthdate}`;
      chipsList.appendChild(birthDate);


      console.log(data)
      const cesfamName = document.querySelector('.cesfam-name');
      cesfamName.classList.add('size')
      cesfamName.textContent = data.cesfam_name; 



      const cesfamPhone = document.querySelector('.cesfam-phone')
      cesfamPhone.classList.add('size')
      cesfamPhone.classList.add('chip')
      cesfamPhone.textContent = `Telefono: ${data.cesfam_phone}`

      const cesfamAddress = document.querySelector('.cesfam-address')

      cesfamAddress.classList.add('chip')
      cesfamAddress.textContent = `Dirección: ${data.cesfam_address}`
  

      
    }
  });
});