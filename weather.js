const input = document.querySelector("#input");
const city = document.querySelector("#origin-city");
const Destcity = document.querySelector("#dest-city");

const cityName = document.querySelector("#cityName");
const Temp = document.querySelector("#temp");
const main = document.querySelector("#main");
const discription = document.querySelector("#discription");
const image = document.querySelector("#image");

const lat = document.querySelector("#latVal");
const lon = document.querySelector("#lonVal");

const latDest = document.querySelector("#latValdest");
const lonDest = document.querySelector("#lonValdest");

var latOrigin = 0
var lonOrigin = 0

var latDestination = 0
var lonDestination = 0

const destCityName = document.querySelector("#destCityName");
const discription2 = document.querySelector("#discription2");
const image2 = document.querySelector("#image2");
const temp = document.querySelector("#temp2");



const timeWithTravel = document.querySelector("#timeWithTraffic");


input.onsubmit = (e) => {
  e.preventDefault();
  if (city.value == "") {
      alert("Origin city is empty!");
  } else if (Destcity.value == ""){
      alert("Destination city is empty!");
  } else {
  weatherUpdate(city.value, Destcity.value);
  trafficUpdate(city.value, Destcity.value);
  timeWithTravel.innerHTML = "Loading..."
  // city.value = "";
  // Destcity.value = "";
  // latOrigin = "";
  // lonOrigin = "";
  // latDestination = "";
  // lonDestination = "";
  }
};

weatherUpdate = (city, Destcity) => {
  conversionFunction = (celsius) => {
     return Math.round(celsius * (9/5) + 32);
  }
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ea5738f6f501bea39f60e764dbefe20f`);

  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Origin city not found");
    } else {
      var data = JSON.parse(xhr.response);
      cityName.innerHTML = data.name;

      startingName.innerHTML = data.name;
      Temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
      main.innerHTML = data.weather[0].main;
      discription.innerHTML = data.weather[0].description;
      image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
  };

  const xhrDCW = new XMLHttpRequest();
  xhrDCW.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${Destcity}&appid=ea5738f6f501bea39f60e764dbefe20f`);

  xhrDCW.send();
  xhrDCW.onload = () => {
    if (xhrDCW.status === 404) {
      alert("Destination city not found");
    } else {
      var dataDCW = JSON.parse(xhrDCW.response);
      destCityName.innerHTML = dataDCW.name;
      endingName.innerHTML = dataDCW.name;
      main2.innerHTML = dataDCW.weather[0].main;
      discription2.innerHTML = dataDCW.weather[0].description;
      temp2.innerHTML = `${Math.round(dataDCW.main.temp - 273.15)}°C `;

      image2.src = `https://openweathermap.org/img/wn/${dataDCW.weather[0].icon}@2x.png`;
    }
  };
};

// getLatLong(city)

// api call to find lat and long of city
// return lat and long

// oirigin = {lat: 090909,
//            long: 90909}

// origin["lat"] =
// getTraficUpdate(origin, destination)


trafficUpdate = (city,Destcity) => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.tomtom.com/search/2/geocode/${city}.json?storeResult=false&view=Unified&key=6HnapFhn28f0KuYUciQfeWVyVv2flktG`,false);


  xhr.onload = () => {
    firstFunction = (latOrigin, lonOrigin) => {
     const xhrdest = new XMLHttpRequest();
     xhrdest.open(
       "GET",
       `https://api.tomtom.com/search/2/geocode/${Destcity}.json?storeResult=false&view=Unified&key=6HnapFhn28f0KuYUciQfeWVyVv2flktG`);


       xhrdest.onload = () => {
       if (xhrdest.status === 404) {
         alert("Place not found");
       } else {

         var data = JSON.parse(xhrdest.response);
         latDest.innerHTML = data.results[0].position.lat;
         lonDest.innerHTML = data.results[0].position.lon;
         latDestination = data.results[0].position.lat;
         lonDestination = data.results[0].position.lon;
         secondFunction(latDestination, lonDestination, latOrigin, lonOrigin);
       }
     };
     xhrdest.send();


   secondFunction = (latDestination,lonDestination, latOrigin, lonOrigin) => {
     const xhr1 = new XMLHttpRequest();
     xhr1.open(
       "GET",
       `https://api.tomtom.com/routing/1/calculateRoute/${latOrigin}%2C${lonOrigin}%3A${latDestination}%2C${lonDestination}/json?key=6HnapFhn28f0KuYUciQfeWVyVv2flktG`);
     xhr1.onload = () => {
       if (xhr1.status === 404) {
         alert("Place not found");
       } else {
         var data = JSON.parse(xhr1.response);
         var hours = Math.floor((data["routes"][0]["summary"]["travelTimeInSeconds"] / 3600));
         var minutes = Math.round((data["routes"][0]["summary"]["travelTimeInSeconds"] / 60) - (hours * 60));
        timeWithTraffic.innerHTML =  `${hours} hours and ${minutes} minutes`;
       };
     };
     xhr1.send();
   };
   };
    if (xhr.status === 404) {
      alert("Place not found");
    } else {
      var data = JSON.parse(xhr.response);
      lat.innerHTML = data.results[0].position.lat;
      lon.innerHTML = data.results[0].position.lon;
      latOrigin = data.results[0].position.lat;
      lonOrigin = data.results[0].position.lon;
      firstFunction(latOrigin, lonOrigin);
  };
  };
  xhr.send();

};


/*
  const xhr1 = new XMLHttpRequest();
  xhr1.open(
    "GET",
    `https://api.tomtom.com/routing/1/calculateRoute/${latOrigin},${lonOrigin}:30.2711286,-97.7436995/json?\
instructionsType=text&language=en-US\
&sectionType=traffic\
&traffic=true&travelMode=car\
&vehicleCommercial=false&vehicleEngineType=combustion\
&key=kM2m7LLARKbRNvWrISvx3d4fuli1GWct`);
  xhr1.send();

  xhr1.onload = () => {
    if (xhr1.status === 404) {
      alert("Place not found");
    } else {
      var data = JSON.parse(xhr1.response);
      console.log((data["routes"][0]["summary"]["travelTimeInSeconds"]));
      const hours = Math.floor((data["routes"][0]["summary"]["travelTimeInSeconds"] / 3600))
      const minutes = Math.round((data["routes"][0]["summary"]["travelTimeInSeconds"] / 60) - (hours * 60))
      timeWithTraffic.innerHTML = `${hours} hours and ${minutes} minutes`;
    }
  };
};
*/

trafficUpdate("Austin","Atlanta");
weatherUpdate("Austin","Atlanta");
