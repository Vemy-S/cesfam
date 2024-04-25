
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
 /*  if (data) {
      document.querySelector('.user-section h1').textContent = `RUT: ${data.rut} Nombre: ${data.fullname} ${data.cesfam_name}`;
  } */

  if (data) {
    console.log(data)
    const patientName = document.querySelector('.patient');
    const patientUser = document.querySelector('.user-info__name span');
    const cesfamName = document.querySelector('.user-info__name p');
    patientName.textContent = data.fullname;
    cesfamName.textContent = `> ${data.cesfam_name}`;
    patientUser.textContent = data.fullname

    
    const userRut = document.querySelector('.user-info__rut p');
    const userAddress = document.querySelector('.user-info__address p');
    const userPhone = document.querySelector('.user-info__phone p');
    userRut.textContent = data.rut;
    userAddress.textContent = data.user_address;
    userPhone.textContent = data.user_phone;

    
    const userEmail = document.querySelector('.user-info__email p');
    const userCountHours = document.querySelector('.user-counthours p');
    const userBirthdate = document.querySelector('.user_birthdate p');
    userEmail.textContent = data.user_email;
    userCountHours.textContent = data.user_counthours;
    userBirthdate.textContent = data.user_birthdate;
}
});
