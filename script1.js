document.getElementById('startExamButton').addEventListener('click', function() {
    // Cache la première page et affiche la demande de géolocalisation
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('geoLocationPage').style.display = 'block';
});

document.getElementById('allowGeoLocationButton').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log("Géolocalisation autorisée:", latitude, longitude);
            
            // Cache la page de géolocalisation et lance l'examen
            document.getElementById('geoLocationPage').style.display = 'none';
            startExam();
        }, function(error) {
            alert("Impossible d'obtenir la géolocalisation.");
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
});

function startExam() {
    document.getElementById('examPage').style.display = 'block';
    
    // Timer pour l'examen
    let timeLeft = 60; // 1 minute par exemple
    document.getElementById('timeLeft').textContent = timeLeft;

    let timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Examen terminé!');
        }
    }, 1000);
}
