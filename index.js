function askLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date()
        };

        fetch('/save-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(coords)
        })
        .then(response => response.text())
        .then(data => {
          alert("Coordonnées enregistrées !");
          document.getElementById("start-exam").style.display = "inline-block";
        })
        .catch(err => {
          alert("Erreur de connexion au serveur : " + err.message);
        });
      },
      (error) => {
        alert("Erreur de géolocalisation : " + error.message);
      }
    );
  } else {
    alert("La géolocalisation n'est pas prise en charge.");
  }
}