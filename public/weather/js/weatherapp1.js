var $ = require('jquery');

$(document).on('ready', function() {
  $('.csbutton').hide();
  var locationinfo, weatherinfo, cityname, statename, weather, degC, degF, lat, lon, map, sunset, sunrise, newCity, newState, newcsinput, compcsinput;
  var clicked = false;
  var dayStyle = [
    {stylers: [{ saturation: "-100" },{ lightness: "15" }]},
    {featureType: "poi",stylers: [{ visibility: "off" }]},
    {featureType: "transit",stylers: [{ visibility: "off" }]},
    {featureType: "road",stylers: [{ lightness: "50" },{ visibility: "on" }]},
    {featureType: "landscape",stylers: [{ lightness: "50" }]},
    {featureType: "all",elementType: "labels",stylers: [{ visibility: "off" }]}        
  ];
  var nightStyle = [
    {"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
    {"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},
    {featureType: "all",elementType: "labels",stylers: [{ visibility: "off" }]},  
    {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
    {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},
    {"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},
    {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},
    {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
    {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},
    {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
    {"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},
    {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},
    {"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},
    {"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}
  ]
  var d = new Date();
  var time = d.getTime().toString().slice(0,-3);
  //var time = 1480506911;
  
  $.getJSON("http://ip-api.com/json", function(data) {
    locationinfo = data;
    cityname = locationinfo.city;
    statename = locationinfo.regionName;
    lon = locationinfo.lon;
    lat = locationinfo.lat;
    var locationbox = document.getElementById('csinput');
    locationbox.value = cityname + ", " + statename;

  
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + cityname + statename + "&APPID=061f24cf3cde2f60644a8240302983f2", function(data) {
      weatherinfo = data;
      weather = weatherinfo.weather[0].main;
      weatherDesc = weatherinfo.weather[0].description;
      degC = Math.round(weatherinfo.main.temp -273);
      degF = Math.round(1.8 * (weatherinfo.main.temp - 273) + 32);
      sunrise = weatherinfo.sys.sunrise;
      sunset = weatherinfo.sys.sunset;
      console.log("sunrise: " + sunrise);
      console.log("sunset: " + sunset);
      document.querySelector('.weather').innerHTML="Current Weather: " + weather;
      document.querySelector('.degC').innerHTML=degC.toString() + "°C";
      document.querySelector('.degF').innerHTML=degF.toString() + "°F";

      window.initMap = function initMap() {
        var options = {
          zoom: 11,
          center:  new google.maps.LatLng(lat,lon),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          draggable: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          zoomControl: false
        };
        console.log("hi");
        map = new google.maps.Map($('.map')[0], options);
      }


      /*var options = {
          zoom: 11,
          center:  new google.maps.LatLng(lat,lon),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          draggable: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          zoomControl: false
      };
      map = new google.maps.Map($('.map')[0], options);*/

      setMapStyle();
      setWeatherIcon();
      getcsinput();
      compcsinput = newcsinput;
    });
  });



  //event handlers
  $('.degF').on('click', function(e) {
    $(this).hide(250).delay(500);
    $('.degC').show(250);
  });

  $('.degC').on('click', function(e) {
    $(this).hide(250).delay(500);
    $('.degF').show(250);
  });

  $(".csbox").mouseenter(function() {
    if (clicked == false) {
      $(this).css({ color: "black"}, 800);
      $('.csinput').css({backgroundColor: "white", textDecoration: "none", border: "1px solid black"});
      $('.csbutton').show();
    }
  });

  $(".csbox").mouseleave(function() {
    getcsinput();
    if (newcsinput == compcsinput) {
      if (clicked == false) {
        if (isDay()) {
          $(this).css({ color: "black"}, 800);
        }
        else {
          $(this).css({ color: "white"}, 800);
        }
        $('.csinput').css({backgroundColor: "transparent", textDecoration: "underline", border: "none"});
        $('.csbutton').hide().css({display: "none"});
      }
    }    
  });

  $(".csinput").focusin(function() {
    clicked = true;
    $('.csbox').css({ color: "black"}, 800);
    $(this).css({backgroundColor: "white", textDecoration: "none", border: "1px solid black"});
    $('.csbutton').show();

  });

  $(".csinput").focusout(function() {
    getcsinput();
    if (newcsinput == compcsinput) {
      clicked = false;
      if (isDay()) {
        $('.csbox').css({ color: "black"}, 800);
      }
      else {
        $('.csbox').css({ color: "white"}, 800);
      }
      $('.csinput').css({backgroundColor: "transparent", textDecoration: "underline", border: "none"});
      $('.csbutton').hide().css({display: "none"});
    }
  });  

  $('.csbutton').on('click', function(e) {
    getcsinput();

    var locationbox = document.getElementById('csinput');
    locationbox.value = newcsinput;

    time = d.getTime().toString().slice(0,-3);
    console.log(time);
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + newcsinput + "&APPID=061f24cf3cde2f60644a8240302983f2", function(data,status) {
      weatherinfo = data;
      console.log(status);
      if (weatherinfo.cod == 502) {
        console.log("you type bad");
      }
      else {
        lat = weatherinfo.coord.lat;
        lon = weatherinfo.coord.lon;
        weather = weatherinfo.weather[0].main;
        weatherDesc = weatherinfo.weather[0].description;
        degC = Math.round(weatherinfo.main.temp -273);
        degF = Math.round(1.8 * (weatherinfo.main.temp - 273) + 32);
        sunrise = weatherinfo.sys.sunrise;
        sunset = weatherinfo.sys.sunset;
        console.log("sunrise: " + sunrise);
        console.log("sunset: " + sunset);
        document.querySelector('.weather').innerHTML="Current Weather: " + weather;
        document.querySelector('.degC').innerHTML=degC.toString() + "°C";
        document.querySelector('.degF').innerHTML=degF.toString() + "°F";
        
        window.initMap = function initMap() {
          var options = {
            zoom: 11,
            center:  new google.maps.LatLng(lat,lon),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            zoomControl: false
          };
          
          map = new google.maps.Map($('.map')[0], options);
        }


        var csWidth = $('.csinput').val().length;
        console.log(csWidth);
        $('.csinput').attr('size',csWidth);

        /*if (isDay() == false) {
          $('.csbox').css({color: "white"});
        }*/


        setMapStyle();
        setWeatherIcon();
        compcsinput = newcsinput;

        clicked = false; 
        if (isDay()) {
          $('.csbox').css({ color: "black"}, 800);
        }
        else {
          $('.csbox').css({ color: "white"}, 800);
        }
        $('.csinput').css({backgroundColor: "transparent", textDecoration: "underline", border: "none"});
        $('.csbutton').hide().css({display: "none"});
      }

      
    });
  });

  $(".csinput").keyup(function (e) {
    if (e.which == 13) {
      $('.csbutton').trigger('click');
      $('.csinput').blur();
    }
  });

  //functions
  function setMapStyle() {
    if (isDay() == true) {
      map.setOptions({
          styles: dayStyle
      });
      $(".boxstyle").css("color", "black");
    }
    else {
      map.setOptions({
          styles: nightStyle
      });
      $(".boxstyle").css("color", "white");
    }
  };

  function isDay() {
    if (time > sunrise && time < sunset) {
      return true;
    }
    else {
      return false;
    }
  };

  function setWeatherIcon() {
    if (weather == "Clear" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-sunny");
    }
    else if (weather == "Clear" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-clear");
    }
    else if (weather == "Clouds" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-cloudy");
    }
    else if (weather == "Clouds" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-cloudy");
    }
    else if (weather == "Thunderstorm" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-storm-showers");
    }
    else if (weather == "Thunderstorm" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-storm-showers");
    }
    else if (weather == "Rain" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-showers");
    }
    else if (weather == "Rain" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-alt-showers");
    }
    else if (weather == "Snow" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-snow");
    }
    else if (weather == "Snow" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-alt-snow");
    }
    else if (weather == "Drizzle" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-rain-mix");
    }
    else if (weather == "Drizzle" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-alt-rain-mix");
    }
    else if (weather == "Mist" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-rain-mix");
    }
    else if (weather == "Mist" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-alt-rain-mix");
    }
    else if (weather == "Fog" && isDay() == true) {
      clearIcon();
      $(".weathericon").addClass("wi wi-day-rain-mix");
    }
    else if (weather == "Fog" && isDay() == false) {
      clearIcon();
      $(".weathericon").addClass("wi wi-night-alt-rain-mix");
    }
    else {
      $(".weathericon").addClass("wi storm-warning");
    }
  };

  function getcsinput() {
    var csinput = $('.csinput').val();
    csinput = csinput.trim();
    csinput = convertCase(csinput);
    csinput = csinput.replace(/ +(?= )/g,'');
    csinput = removePunctuation(csinput);
    newcsinput = csinput;
  };

  function removePunctuation(word) {
    var norm = word.replace(/[^A-Za-z0-9_., -]/g,"");
    return norm;
  };

  function clearIcon() {
    $('.weathericon').removeClass("wi wi-day-sunny wi-night-clear wi-day-cloudy wi-night-cloudy wi-day-storm-showers wi-night-storm-showers wi-day-showers wi-night-alt-showers wi-day-snow wi-night-alt-snow wi-day-rain-mix wi-night-alt-rain-mix");
  };

  function convertCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };




});

  
  

    
/*
{
   "as":"AS7922 Comcast Cable Communications, LLC",
   "city":"Boston",
   "country":"United States",
   "countryCode":"US",
   "isp":"Comcast Cable",
   "lat":42.3605,
   "lon":-71.0548,
   "org":"Comcast Cable",
   "query":"76.118.10.99",
   "region":"MA",
   "regionName":"Massachusetts",
   "status":"success",
   "timezone":"America/New_York",
   "zip":"02109"
}



http://api.openweathermap.org/data/2.5/weather?lat=42.3424&lon=-71.0878&APPID=061f24cf3cde2f60644a8240302983f2

{
  "coord":{"lon":-71.08,"lat":42.33},
  "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
  "base":"cmc stations",
  "main":{"temp":302.75,"pressure":1018.204,"humidity":44,"temp_min":299.82,"temp_max":304.82},
  "wind":{"speed":1.3,"deg":135,"gust":4.5},
  "clouds":{"all":0},
  "dt":1470335190,
  "sys":{"type":3,"id":1442728407,"message":0.0042,"country":"US","sunrise":1470303678,"sunset":1470355114},
  "id":4952349,
  "name":"Suffolk County",
  "cod":200
}
*/


