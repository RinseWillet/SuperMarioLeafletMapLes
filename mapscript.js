// hier komt alle scripting voor de kaart


//LINK NAAR JE MAPBOX STUDIO CREATIE
//‘https://api.mapbox.com/styles/v1/USERNAME/STYLE_ID_NUMMER/tiles/256/{z}/{x}/{y}@2x?access_token=JOUW_API_KEY’ 

//variabele voor de 'View' van de kaart aan te maken die de div met de mapid ID target in je HTML
var mymap = L.map('mapid').setView([52.0473, 4.30012], 13);

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
var marker2 = L.marker([52.044139, 4.300987], { icon: kasteel }).addTo(mymap);
marker2.bindPopup("Ik ben een kasteel");


//array

const voorbeeldArray = ["aap", "noot", "mies", "codecafe"];

console.log("eerste item : " + voorbeeldArray[0]);
console.log("tweede item : " + voorbeeldArray[1]);

//twee dimensionale array

const tweedimensionaleArray = [["aap", "noot", "mies", "codecafe"], ["saab", "volkswagen", "fiat"], ["Yoshi", "Mario", "Luigi", "Peach"]];

console.log("tweede item, eerste array : " + tweedimensionaleArray[0][1]);
console.log("eerste item, tweede array : " + tweedimensionaleArray[1][0]);
console.log("vierde item, derde array : " + tweedimensionaleArray[2][3]);

//array met markers
// 2 dimensionaal

// naam
// Breedtegraad,
// Lengtegraad
// locatie icon
// scaledSize breedte,
// en hoogte

//array met alle markers
const markers = [

    // individuele
    [
        "Yoshi\'s House",
        52.044794,                  //breedtegraad
        4.280050,                   //lengtegraad
        "../icons/hethuisvanyoshi.svg", //icoon path
        38,                         //breedte
        31                          //lengte
    ],

    [
        "Ghost House",
        52.047566,
        4.308938,
        "../icons/spookhuis.svg",
        40,
        48
    ],

    [
        "Castle",
        52.044139,
        4.300987,
        "../icons/kasteel.svg",
        40,
        53
    ],

    [
        "Warp Pipe",
        52.054328,
        4.308512,
        "../icons/pijp.svg",
        38,
        42.5
    ],

    [
        "Star World",
        52.054873,
        4.288318,
        "../icons/ster.svg",
        38,
        38
    ],

    [
        "Donut Plains",
        52.055691,
        4.263141,
        "../icons/heuvelmetogen.svg",
        50,
        60.7
    ]
];

console.log(markers[2][0]);

//for loop om de markers op de kaart te zetten

for (let i = 0; i < markers.length; i++) {
    // 1 checken of de loop werkt
    console.log("het werkt");
    const currMarker = markers[i];

    // 2 checken of iedere array uit de marker array geladen wordt
    console.log(currMarker[0])

    // 3 Markers neerzetten (a eerst zonder icons, b daarna met, en c daarna popup binden)
    const marker = new L.marker([currMarker[1], currMarker[2]], {
        icon: new L.icon({
            iconUrl: currMarker[3],
            iconSize: [currMarker[4], currMarker[5]]
        })
    }
    ).addTo(mymap)
        .bindPopup(currMarker[0])
};

// Stap 7 de gebruikers locatie opzoeken en markeren

// geolocation
mymap.locate({setView: true, maxZoom: 14});  //setview centreert de kaart op jouw locatie, maxZoom stelt daarbij het zoomniveau in

// maken marker op jouw locatie
function onLocationMarker(e) {
    L.marker(e.latlng, {        //latlng haalt de latitude longitude uit argument e
        icon: new L.icon({
            iconUrl: "../icons/jouwplaats.svg",
            iconSize: [30, 47.8]
        })}).addTo(mymap)
        .bindPopup("Je bent hier").openPopup();   //openpopup laat hem automatisch openen
}

//aanroepen functie om te marken
mymap.on('locationfound', onLocationMarker);

// Stap 8 tooltje maken om te clicken en dat je de coordinaten terugkrijgt

// losse voorbeeld popup
var popup = L.popup()
.setLatLng([52.044544, 4.279845])
.setContent("Ik ben een losse popup")
.openOn(mymap);   //let op: zet de popup functie op geolocation uit - 1 popup per initiële opening

// Maken van clickable popup voor jouw locatie
var clickLocatie = L.popup();

function onMapClick(e) {
    clickLocatie
    .setLatLng(e.latlng)
    .setContent("Je klikte op de kaart op deze coördinaten : " + e.latlng.toString())
    .openOn(mymap)
}

//aanroepen functie bij het clicken
mymap.on('click', onMapClick);



