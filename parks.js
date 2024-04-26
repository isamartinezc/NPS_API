let parksDiv = document.querySelector("#parks");
let allParksDiv = document.querySelector("#allParks");
let stateList = document.querySelector("#astate");

let st = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

let states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

for (i = 0; i < states.length; i++) {
  stateList.innerHTML +=
    "<option value=" + st[i] + ">" + states[i] + "</option";
}

$(document).ready(function () {
  $.getJSON(
    "https://developer.nps.gov/api/v1/parks?&api_key=EkdpRXraz4hFOZhnQVeXF5XZ87HjDBnw1qJJbywd",
    function (data) {
      allParksDiv.innerHTML = "";

      allParksDiv.innerHTML = "<h2 id='sta'> All the Sites </h2>";

      for (var i = 0; i < data.data.length; i++) {
        let pc = data.data[i].parkCode;

        allParksDiv.innerHTML +=
          "<div class='park-container'> <div class='park-content'><h2>" +
          data.data[i].fullName +
          "</h2>" +
          "<p> <strong> State: </Strong>" +
          data.data[i].states +
          "</p> <p>" +
          data.data[i].description +
          "</p><br><button class='learn' onclick='getPark(\"" +
          pc +
          "\")'>Learn More</button> </div> <div class='park-image'> <img src=" +
          data.data[i].images[0].url +
          " alt=" +
          data.data[i].images[0].altText +
          "> </div> </div>";
      }
    }
  );
});

function getState(stateCode) {
  $.getJSON(
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
      stateCode +
      "&api_key=EkdpRXraz4hFOZhnQVeXF5XZ87HjDBnw1qJJbywd",

    function (data) {
      allParksDiv.innerHTML = "";
      parksDiv.innerHTML = ""; // Clear previous results before adding new ones

      // Find the state name in the states array based on the index
      let selectedStateIndex = st.indexOf(stateCode);
      let selectedStateName = states[selectedStateIndex];

      // Update the statesDiv element with the selected state name
      parksDiv.innerHTML = "<h2 id='sta'>" + selectedStateName + "</h2>";

      for (var i = 0; i < data.data.length; i++) {
        let pc = data.data[i].parkCode;

        parksDiv.innerHTML +=
          "<div class='park-container'> <div class='park-content'><h2>" +
          data.data[i].fullName +
          "</h2>" +
          "<p>" +
          data.data[i].description +
          "</p><br><button class='learn' onclick='getPark(\"" +
          pc +
          "\")'>Learn More</button> </div> <div class='park-image'> <img src=" +
          data.data[i].images[0].url +
          " alt=" +
          data.data[i].images[0].altText +
          "> </div> </div>";
      }
    }
  );
}

// article once lean more is clicked

function getPark(parkCode) {
  $.getJSON(
    "https://developer.nps.gov/api/v1/parks?parkCode=" +
      parkCode +
      "&api_key=EkdpRXraz4hFOZhnQVeXF5XZ87HjDBnw1qJJbywd",

    function (data) {
      parksDiv.innerHTML = ""; // Clear previous results before adding new ones
      allParksDiv.innerHTML = ""; // Clear previous results before adding new ones
      for (var i = 0; i < data.data.length; i++) {
        parksDiv.innerHTML +=
          " <a href='parks.html'> <button> < Go Back</button>  </a> <div class='article'> <h3>" +
          data.data[i].fullName +
          "</h3>" +
          "<h4>" +
          data.data[i].designation +
          "</h4> <p>" +
          data.data[i].description +
          "</p> <br>" +
          "<div class='image-gallery'><img src=" +
          data.data[i].images[0].url +
          " alt=" +
          data.data[i].images[0].altText +
          "> <img src=" +
          data.data[i].images[1].url +
          " alt=" +
          data.data[i].images[1].altText +
          "> <img src=" +
          data.data[i].images[2].url +
          " alt=" +
          data.data[i].images[2].altText +
          "> </div> <br> " +
          "<p> <strong> Weather Info: </strong> " +
          data.data[i].weatherInfo +
          "</p> <br> <p> <strong> Mailing Adress: </strong> " +
          data.data[i].addresses[1].line1 +
          ", " +
          data.data[i].addresses[1].city +
          ", " +
          data.data[i].addresses[1].stateCode +
          ", " +
          data.data[i].addresses[1].postalCode +
          "</p>  <p> <strong> Physical Adress: </strong> " +
          data.data[i].addresses[0].line1 +
          ", " +
          data.data[i].addresses[0].city +
          ", " +
          data.data[i].addresses[0].stateCode +
          ", " +
          data.data[i].addresses[0].postalCode +
          "</p> <p> <strong> Directions: </strong> " +
          data.data[i].directionsInfo +
          "</p> <br> <p> <strong> Phone Number: </strong> " +
          data.data[i].contacts.phoneNumbers[0].phoneNumber +
          "</p> <p> <strong> Email: </strong> " +
          data.data[i].contacts.emailAddresses[0].emailAddress +
          "</p> <br>" +
          "</div>";
      }
    }
  );
}
