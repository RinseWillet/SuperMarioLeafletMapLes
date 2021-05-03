// hier komt alle scripting voor de kaart


//LINK NAAR JE MAPBOX STUDIO CREATIE
//‘https://api.mapbox.com/styles/v1/USERNAME/STYLE_ID_NUMMER/tiles/256/{z}/{x}/{y}@2x?access_token=JOUW_API_KEY’ 

//variabele voor de 'View' van de kaart aan te maken die de div met de mapid ID target in je HTML
var mymap =L.map('mapid').setView([52.0473, 4.30012], 13);

// Tilelayer toevoegen
L.tileLayer('https://api.mapbox.com/styles/v1/ikwillet/cknnbwg3f46r117p1bg3gfj2g/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWt3aWxsZXQiLCJhIjoiY2tubjd5a3VtMGJ2dDJvbGF6NXl4bTA2OCJ9.tflsVQCVhM4im9wS94mkHw', {
    attribution: 'Super Mario Mapbox', //tekstje in je kaart rechtsonder
    maxZoom: 18,  //maximum zoomniveau (inzoom)
    id: 'mapbox/streets-v11',        //id informatie over de versie van de gegevens - hoeft niet
    tileSize: 512,  //de grootte van de tiles en hoe groot ze worden ingeladen (als vierkanten)
    zoomOffset: -1 //het zoom getal wat gebruikt wordt in de tile-url's wordt aangepast met dit getal - dit mag maar hoeft niet
}).addTo(mymap);


//standaard marker toevoegen
var marker = L.marker([52.05, 4.34]).addTo(mymap);

//popup aan marker toevoegen
marker.bindPopup("<b>Hello!</b><br>Ik ben een popup.").openPopup();

// circle marker toevoegen
var circle = L.circle([52.02, 4.301], {   ///coordinaten
    color: 'red',   //kleur outline
    fillColor: '#f03', //fill kleur
    fillOpacity: 0.5, //opaakheid kleur
    radius: 100     //straal cirkel
}).addTo(mymap);
circle.bindPopup("Ik ben een cirkel.");   //popup

// custom icoon marker toevoegen
var kasteel = L.icon({
    iconUrl: "../icons/kasteel.svg",
    iconSize: [40, 53]    //breedte en hoogte, in dit geval is de aspect ratio locked, dus moeten allebei de groottes groter om de 
})

//marker van icoon toevoegen met popup
var marker2 = L.marker([52.044139, 4.300987], {icon: kasteel}).addTo(mymap);
marker2.bindPopup("Ik ben een kasteel");