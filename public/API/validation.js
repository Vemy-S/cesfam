
document.getElementById("user_rut").addEventListener("keypress", function(event) {
    if (event.key.length === 1 && isNaN(event.key)) {
        event.preventDefault();
    }
});


