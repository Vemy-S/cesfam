const showBtn = document.getElementById('show')
const inputValue = document.getElementById('pwd')
const value = document.getElementById('value')

showBtn.addEventListener('click', () => {
    const password = inputValue.value
    value.textContent =  ` ${password}`

}) 

/* inputValue.addEventListener('input', () => {
    const password = inputValue.value
    value.textContent = `${password}`

}) */
