// Crear el mapa centrado en la coordenada inicial
var map = L.map('map').setView([-27.475, -58.8526], 16);

// Cargar y mostrar los tiles del mapa de OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Función para cargar los marcadores guardados en localStorage
function cargarMarcadores() {
    var marcadoresGuardados = JSON.parse(localStorage.getItem('marcadores')) || [];
    marcadoresGuardados.forEach(function(coord) {
        L.marker([coord.lat, coord.lng]).addTo(map);
    });
}

// Función para guardar un marcador en localStorage
function guardarMarcador(lat, lng) {
    var marcadores = JSON.parse(localStorage.getItem('marcadores')) || [];
    marcadores.push({ lat: lat, lng: lng });
    localStorage.setItem('marcadores', JSON.stringify(marcadores));
}

// Manejar el evento de clic en el mapa
map.on('click', function(e) {
    // Agregar un marcador al mapa
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    
    // Guardar las coordenadas del marcador en localStorage
    guardarMarcador(e.latlng.lat, e.latlng.lng);
});

// Función para borrar todos los marcadores
function BorrarMarcadores() {
    // Eliminar marcadores del mapa
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Limpiar localStorage
    localStorage.removeItem('marcadores');
}

// Cargar marcadores guardados al inicio
cargarMarcadores();

document.getElementById('removeMarkersButton').addEventListener('click', BorrarMarcadores);
