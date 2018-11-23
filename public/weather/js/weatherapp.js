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

  $.getJSON("https://ipinfo.io/json", function(data1) {

    if (data1.hasOwnProperty('city')) { //success
      locationinfo = data1;
      cityname = locationinfo.city;
      statename = locationinfo.region;
      lat = locationinfo.loc.split(',')[0];
      lon = locationinfo.loc.split(',')[1];
      var locationbox = document.getElementById('csinput');
      locationbox.value = cityname + ", " + statename;
      $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + statename + "&APPID=061f24cf3cde2f60644a8240302983f2", function(data2) {
        weatherinfo = data2;
        weather = weatherinfo.weather[0].main;
        weatherDesc = weatherinfo.weather[0].description;
        degC = Math.round(weatherinfo.main.temp -273);
        degF = Math.round(1.8 * (weatherinfo.main.temp - 273) + 32);
        sunrise = weatherinfo.sys.sunrise;
        sunset = weatherinfo.sys.sunset;
        document.querySelector('.weather').innerHTML="Current Weather: " + weather;
        document.querySelector('.degC').innerHTML=degC.toString() + "°C";
        document.querySelector('.degF').innerHTML=degF.toString() + "°F";

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

        setMapStyle();
        setWeatherIcon();
        getcsinput();
        compcsinput = newcsinput;
      });
    }  

    else {  //fail
      var locationbox = document.getElementById('csinput');
      locationbox.value = "New York City, NY";
      $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=newyork&APPID=061f24cf3cde2f60644a8240302983f2", function(data2) {
        weatherinfo = data2;
        lon = weatherinfo.coord.lon;
        lat = weatherinfo.coord.lat;
        weather = weatherinfo.weather[0].main;
        weatherDesc = weatherinfo.weather[0].description;
        degC = Math.round(weatherinfo.main.temp -273);
        degF = Math.round(1.8 * (weatherinfo.main.temp - 273) + 32);
        sunrise = weatherinfo.sys.sunrise;
        sunset = weatherinfo.sys.sunset;
        document.querySelector('.weather').innerHTML="Current Weather: " + weather;
        document.querySelector('.degC').innerHTML=degC.toString() + "°C";
        document.querySelector('.degF').innerHTML=degF.toString() + "°F";

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

        setMapStyle();
        setWeatherIcon();
        getcsinput();
        compcsinput = newcsinput;
      });
    }
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
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + newcsinput + "&APPID=061f24cf3cde2f60644a8240302983f2", function(data,status) {
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

        /*google map api key - AIzaSyCFsdKwPMX4hKp5r77eWGjyEhEgTUp8SEM*/
        map = new google.maps.Map($('.map')[0], options);

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