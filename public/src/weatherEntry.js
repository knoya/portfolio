/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);

/***/ },

/***/ 7:
/***/ function(module, exports) {

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
	  $.getJSON("https://ipinfo.io/json", function(data) {
	    locationinfo = data;
	    cityname = locationinfo.city;
	    statename = locationinfo.region;
	    lat = locationinfo.loc.split(',')[0];
    	    lon = locationinfo.loc.split(',')[1];
	    var locationbox = document.getElementById('csinput');
	    locationbox.value = cityname + ", " + statename;
	
	  
	    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + statename + "&APPID=061f24cf3cde2f60644a8240302983f2", function(data) {
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
	https://api.openweathermap.org/data/2.5/weather?lat=42.3424&lon=-71.0878&APPID=061f24cf3cde2f60644a8240302983f2
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

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2I0MGRkN2Q3YjFhYTQzMDdjNzY/NGQ5ZSoqIiwid2VicGFjazovLy8uL3B1YmxpYy93ZWF0aGVyL2pzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvd2VhdGhlci9qcy93ZWF0aGVyYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3RDQSx3Qjs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLLFdBQVcscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUU7QUFDM0QsTUFBSyw4QkFBOEIsb0JBQW9CLEVBQUU7QUFDekQsTUFBSyxrQ0FBa0Msb0JBQW9CLEVBQUU7QUFDN0QsTUFBSywrQkFBK0Isa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUU7QUFDN0UsTUFBSyxvQ0FBb0Msa0JBQWtCLEVBQUU7QUFDN0QsTUFBSyxvREFBb0Qsb0JBQW9CLEU7QUFDN0U7QUFDQTtBQUNBLE1BQUssaUVBQWlFLGtCQUFrQixFQUFFO0FBQzFGLE1BQUssbUVBQW1FLGtCQUFrQixFQUFFLGVBQWUsRUFBRTtBQUM3RyxNQUFLLG9EQUFvRCxvQkFBb0IsRUFBRTtBQUMvRSxNQUFLLHlFQUF5RSxrQkFBa0IsRUFBRTtBQUNsRyxNQUFLLDJFQUEyRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFO0FBQ3BJLE1BQUssMERBQTBELGtCQUFrQixFQUFFO0FBQ25GLE1BQUsseURBQXlELGtCQUFrQixFQUFFLGNBQWMsRUFBRTtBQUNsRyxNQUFLLHVFQUF1RSxrQkFBa0IsRUFBRTtBQUNoRyxNQUFL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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBK0Msa0VBQWtFO0FBQ2pIOzs7OztBQUtBLEVBQUM7Ozs7OztBQU1EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyx5QkFBeUI7QUFDcEMsZUFBYywrREFBK0Q7QUFDN0U7QUFDQSxXQUFVLG9GQUFvRjtBQUM5RixXQUFVLGlDQUFpQztBQUMzQyxhQUFZLFFBQVE7QUFDcEI7QUFDQSxVQUFTLGtHQUFrRztBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBLEciLCJmaWxlIjoid2VhdGhlckVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2I0MGRkN2Q3YjFhYTQzMDdjNzYiLCJyZXF1aXJlKFwiLi93ZWF0aGVyYXBwLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3dlYXRoZXIvanMvc2NyaXB0LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIiQoZG9jdW1lbnQpLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuICAkKCcuY3NidXR0b24nKS5oaWRlKCk7XG4gIHZhciBsb2NhdGlvbmluZm8sIHdlYXRoZXJpbmZvLCBjaXR5bmFtZSwgc3RhdGVuYW1lLCB3ZWF0aGVyLCBkZWdDLCBkZWdGLCBsYXQsIGxvbiwgbWFwLCBzdW5zZXQsIHN1bnJpc2UsIG5ld0NpdHksIG5ld1N0YXRlLCBuZXdjc2lucHV0LCBjb21wY3NpbnB1dDtcbiAgdmFyIGNsaWNrZWQgPSBmYWxzZTtcbiAgdmFyIGRheVN0eWxlID0gW1xuICAgIHtzdHlsZXJzOiBbeyBzYXR1cmF0aW9uOiBcIi0xMDBcIiB9LHsgbGlnaHRuZXNzOiBcIjE1XCIgfV19LFxuICAgIHtmZWF0dXJlVHlwZTogXCJwb2lcIixzdHlsZXJzOiBbeyB2aXNpYmlsaXR5OiBcIm9mZlwiIH1dfSxcbiAgICB7ZmVhdHVyZVR5cGU6IFwidHJhbnNpdFwiLHN0eWxlcnM6IFt7IHZpc2liaWxpdHk6IFwib2ZmXCIgfV19LFxuICAgIHtmZWF0dXJlVHlwZTogXCJyb2FkXCIsc3R5bGVyczogW3sgbGlnaHRuZXNzOiBcIjUwXCIgfSx7IHZpc2liaWxpdHk6IFwib25cIiB9XX0sXG4gICAge2ZlYXR1cmVUeXBlOiBcImxhbmRzY2FwZVwiLHN0eWxlcnM6IFt7IGxpZ2h0bmVzczogXCI1MFwiIH1dfSxcbiAgICB7ZmVhdHVyZVR5cGU6IFwiYWxsXCIsZWxlbWVudFR5cGU6IFwibGFiZWxzXCIsc3R5bGVyczogW3sgdmlzaWJpbGl0eTogXCJvZmZcIiB9XX0gICAgICAgIFxuICBdO1xuICB2YXIgbmlnaHRTdHlsZSA9IFtcbiAgICB7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifV19LFxuICAgIHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTN9XX0sXG4gICAge2ZlYXR1cmVUeXBlOiBcImFsbFwiLGVsZW1lbnRUeXBlOiBcImxhYmVsc1wiLHN0eWxlcnM6IFt7IHZpc2liaWxpdHk6IFwib2ZmXCIgfV19LCAgXG4gICAge1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifV19LFxuICAgIHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzE0NGI1M1wifSx7XCJsaWdodG5lc3NcIjoxNH0se1wid2VpZ2h0XCI6MS40fV19LFxuICAgIHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwODMwNGJcIn1dfSxcbiAgICB7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwYzQxNTJcIn0se1wibGlnaHRuZXNzXCI6NX1dfSxcbiAgICB7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifV19LFxuICAgIHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwYjQzNGZcIn0se1wibGlnaHRuZXNzXCI6MjV9XX0sXG4gICAge1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9XX0sXG4gICAge1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwYjNkNTFcIn0se1wibGlnaHRuZXNzXCI6MTZ9XX0sXG4gICAge1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifV19LFxuICAgIHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMTQ2NDc0XCJ9XX0sXG4gICAge1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDIxMDE5XCJ9XX1cbiAgXVxuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gZC5nZXRUaW1lKCkudG9TdHJpbmcoKS5zbGljZSgwLC0zKTtcbiAgLy92YXIgdGltZSA9IDE0ODA1MDY5MTE7XG4gICQuZ2V0SlNPTihcImh0dHA6Ly9pcC1hcGkuY29tL2pzb25cIiwgZnVuY3Rpb24oZGF0YSkge1xuICAgIGxvY2F0aW9uaW5mbyA9IGRhdGE7XG4gICAgY2l0eW5hbWUgPSBsb2NhdGlvbmluZm8uY2l0eTtcbiAgICBzdGF0ZW5hbWUgPSBsb2NhdGlvbmluZm8ucmVnaW9uTmFtZTtcbiAgICBsb24gPSBsb2NhdGlvbmluZm8ubG9uO1xuICAgIGxhdCA9IGxvY2F0aW9uaW5mby5sYXQ7XG4gICAgdmFyIGxvY2F0aW9uYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NzaW5wdXQnKTtcbiAgICBsb2NhdGlvbmJveC52YWx1ZSA9IGNpdHluYW1lICsgXCIsIFwiICsgc3RhdGVuYW1lO1xuXG4gIFxuICAgICQuZ2V0SlNPTihcImh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1cIiArIGNpdHluYW1lICsgc3RhdGVuYW1lICsgXCImQVBQSUQ9MDYxZjI0Y2YzY2RlMmY2MDY0NGE4MjQwMzAyOTgzZjJcIiwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgd2VhdGhlcmluZm8gPSBkYXRhO1xuICAgICAgd2VhdGhlciA9IHdlYXRoZXJpbmZvLndlYXRoZXJbMF0ubWFpbjtcbiAgICAgIHdlYXRoZXJEZXNjID0gd2VhdGhlcmluZm8ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAgIGRlZ0MgPSBNYXRoLnJvdW5kKHdlYXRoZXJpbmZvLm1haW4udGVtcCAtMjczKTtcbiAgICAgIGRlZ0YgPSBNYXRoLnJvdW5kKDEuOCAqICh3ZWF0aGVyaW5mby5tYWluLnRlbXAgLSAyNzMpICsgMzIpO1xuICAgICAgc3VucmlzZSA9IHdlYXRoZXJpbmZvLnN5cy5zdW5yaXNlO1xuICAgICAgc3Vuc2V0ID0gd2VhdGhlcmluZm8uc3lzLnN1bnNldDtcbiAgICAgIGNvbnNvbGUubG9nKFwic3VucmlzZTogXCIgKyBzdW5yaXNlKTtcbiAgICAgIGNvbnNvbGUubG9nKFwic3Vuc2V0OiBcIiArIHN1bnNldCk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcicpLmlubmVySFRNTD1cIkN1cnJlbnQgV2VhdGhlcjogXCIgKyB3ZWF0aGVyO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZ0MnKS5pbm5lckhUTUw9ZGVnQy50b1N0cmluZygpICsgXCLCsENcIjtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWdGJykuaW5uZXJIVE1MPWRlZ0YudG9TdHJpbmcoKSArIFwiwrBGXCI7XG5cbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHpvb206IDExLFxuICAgICAgICAgIGNlbnRlcjogIG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LGxvbiksXG4gICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxuICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgICAgIGRpc2FibGVEb3VibGVDbGlja1pvb206IHRydWUsXG4gICAgICAgICAgem9vbUNvbnRyb2w6IGZhbHNlXG4gICAgICB9O1xuICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCgkKCcubWFwJylbMF0sIG9wdGlvbnMpO1xuXG4gICAgICBzZXRNYXBTdHlsZSgpO1xuICAgICAgc2V0V2VhdGhlckljb24oKTtcbiAgICAgIGdldGNzaW5wdXQoKTtcbiAgICAgIGNvbXBjc2lucHV0ID0gbmV3Y3NpbnB1dDtcbiAgICB9KTtcbiAgfSk7XG5cblxuXG4gIC8vZXZlbnQgaGFuZGxlcnNcbiAgJCgnLmRlZ0YnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgJCh0aGlzKS5oaWRlKDI1MCkuZGVsYXkoNTAwKTtcbiAgICAkKCcuZGVnQycpLnNob3coMjUwKTtcbiAgfSk7XG5cbiAgJCgnLmRlZ0MnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgJCh0aGlzKS5oaWRlKDI1MCkuZGVsYXkoNTAwKTtcbiAgICAkKCcuZGVnRicpLnNob3coMjUwKTtcbiAgfSk7XG5cbiAgJChcIi5jc2JveFwiKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgIGlmIChjbGlja2VkID09IGZhbHNlKSB7XG4gICAgICAkKHRoaXMpLmNzcyh7IGNvbG9yOiBcImJsYWNrXCJ9LCA4MDApO1xuICAgICAgJCgnLmNzaW5wdXQnKS5jc3Moe2JhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiLCB0ZXh0RGVjb3JhdGlvbjogXCJub25lXCIsIGJvcmRlcjogXCIxcHggc29saWQgYmxhY2tcIn0pO1xuICAgICAgJCgnLmNzYnV0dG9uJykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJChcIi5jc2JveFwiKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xuICAgIGdldGNzaW5wdXQoKTtcbiAgICBpZiAobmV3Y3NpbnB1dCA9PSBjb21wY3NpbnB1dCkge1xuICAgICAgaWYgKGNsaWNrZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGlzRGF5KCkpIHtcbiAgICAgICAgICAkKHRoaXMpLmNzcyh7IGNvbG9yOiBcImJsYWNrXCJ9LCA4MDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICQodGhpcykuY3NzKHsgY29sb3I6IFwid2hpdGVcIn0sIDgwMCk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmNzaW5wdXQnKS5jc3Moe2JhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLCB0ZXh0RGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIiwgYm9yZGVyOiBcIm5vbmVcIn0pO1xuICAgICAgICAkKCcuY3NidXR0b24nKS5oaWRlKCkuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgICAgfVxuICAgIH0gICAgXG4gIH0pO1xuXG4gICQoXCIuY3NpbnB1dFwiKS5mb2N1c2luKGZ1bmN0aW9uKCkge1xuICAgIGNsaWNrZWQgPSB0cnVlO1xuICAgICQoJy5jc2JveCcpLmNzcyh7IGNvbG9yOiBcImJsYWNrXCJ9LCA4MDApO1xuICAgICQodGhpcykuY3NzKHtiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIiwgdGV4dERlY29yYXRpb246IFwibm9uZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkIGJsYWNrXCJ9KTtcbiAgICAkKCcuY3NidXR0b24nKS5zaG93KCk7XG5cbiAgfSk7XG5cbiAgJChcIi5jc2lucHV0XCIpLmZvY3Vzb3V0KGZ1bmN0aW9uKCkge1xuICAgIGdldGNzaW5wdXQoKTtcbiAgICBpZiAobmV3Y3NpbnB1dCA9PSBjb21wY3NpbnB1dCkge1xuICAgICAgY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgaWYgKGlzRGF5KCkpIHtcbiAgICAgICAgJCgnLmNzYm94JykuY3NzKHsgY29sb3I6IFwiYmxhY2tcIn0sIDgwMCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCgnLmNzYm94JykuY3NzKHsgY29sb3I6IFwid2hpdGVcIn0sIDgwMCk7XG4gICAgICB9XG4gICAgICAkKCcuY3NpbnB1dCcpLmNzcyh7YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCIsIHRleHREZWNvcmF0aW9uOiBcInVuZGVybGluZVwiLCBib3JkZXI6IFwibm9uZVwifSk7XG4gICAgICAkKCcuY3NidXR0b24nKS5oaWRlKCkuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7ICBcblxuICAkKCcuY3NidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZ2V0Y3NpbnB1dCgpO1xuXG4gICAgdmFyIGxvY2F0aW9uYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NzaW5wdXQnKTtcbiAgICBsb2NhdGlvbmJveC52YWx1ZSA9IG5ld2NzaW5wdXQ7XG5cbiAgICB0aW1lID0gZC5nZXRUaW1lKCkudG9TdHJpbmcoKS5zbGljZSgwLC0zKTtcbiAgICBjb25zb2xlLmxvZyh0aW1lKTtcbiAgICAkLmdldEpTT04oXCJodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9XCIgKyBuZXdjc2lucHV0ICsgXCImQVBQSUQ9MDYxZjI0Y2YzY2RlMmY2MDY0NGE4MjQwMzAyOTgzZjJcIiwgZnVuY3Rpb24oZGF0YSxzdGF0dXMpIHtcbiAgICAgIHdlYXRoZXJpbmZvID0gZGF0YTtcbiAgICAgIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICBpZiAod2VhdGhlcmluZm8uY29kID09IDUwMikge1xuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSB0eXBlIGJhZFwiKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXQgPSB3ZWF0aGVyaW5mby5jb29yZC5sYXQ7XG4gICAgICAgIGxvbiA9IHdlYXRoZXJpbmZvLmNvb3JkLmxvbjtcbiAgICAgICAgd2VhdGhlciA9IHdlYXRoZXJpbmZvLndlYXRoZXJbMF0ubWFpbjtcbiAgICAgICAgd2VhdGhlckRlc2MgPSB3ZWF0aGVyaW5mby53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgICAgICBkZWdDID0gTWF0aC5yb3VuZCh3ZWF0aGVyaW5mby5tYWluLnRlbXAgLTI3Myk7XG4gICAgICAgIGRlZ0YgPSBNYXRoLnJvdW5kKDEuOCAqICh3ZWF0aGVyaW5mby5tYWluLnRlbXAgLSAyNzMpICsgMzIpO1xuICAgICAgICBzdW5yaXNlID0gd2VhdGhlcmluZm8uc3lzLnN1bnJpc2U7XG4gICAgICAgIHN1bnNldCA9IHdlYXRoZXJpbmZvLnN5cy5zdW5zZXQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VucmlzZTogXCIgKyBzdW5yaXNlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdW5zZXQ6IFwiICsgc3Vuc2V0KTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXInKS5pbm5lckhUTUw9XCJDdXJyZW50IFdlYXRoZXI6IFwiICsgd2VhdGhlcjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZ0MnKS5pbm5lckhUTUw9ZGVnQy50b1N0cmluZygpICsgXCLCsENcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZ0YnKS5pbm5lckhUTUw9ZGVnRi50b1N0cmluZygpICsgXCLCsEZcIjtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgem9vbTogMTEsXG4gICAgICAgICAgY2VudGVyOiAgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsbG9uKSxcbiAgICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXG4gICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZSxcbiAgICAgICAgICB6b29tQ29udHJvbDogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICAvKmdvb2dsZSBtYXAgYXBpIGtleSAtIEFJemFTeUNGc2RLd1BNWDRoS3A1cjc3ZVdHanlFaEVnVFVwOFNFTSovXG4gICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoJCgnLm1hcCcpWzBdLCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgY3NXaWR0aCA9ICQoJy5jc2lucHV0JykudmFsKCkubGVuZ3RoO1xuICAgICAgICBjb25zb2xlLmxvZyhjc1dpZHRoKTtcbiAgICAgICAgJCgnLmNzaW5wdXQnKS5hdHRyKCdzaXplJyxjc1dpZHRoKTtcblxuICAgICAgICAvKmlmIChpc0RheSgpID09IGZhbHNlKSB7XG4gICAgICAgICAgJCgnLmNzYm94JykuY3NzKHtjb2xvcjogXCJ3aGl0ZVwifSk7XG4gICAgICAgIH0qL1xuXG5cbiAgICAgICAgc2V0TWFwU3R5bGUoKTtcbiAgICAgICAgc2V0V2VhdGhlckljb24oKTtcbiAgICAgICAgY29tcGNzaW5wdXQgPSBuZXdjc2lucHV0O1xuXG4gICAgICAgIGNsaWNrZWQgPSBmYWxzZTsgXG4gICAgICAgIGlmIChpc0RheSgpKSB7XG4gICAgICAgICAgJCgnLmNzYm94JykuY3NzKHsgY29sb3I6IFwiYmxhY2tcIn0sIDgwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJCgnLmNzYm94JykuY3NzKHsgY29sb3I6IFwid2hpdGVcIn0sIDgwMCk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmNzaW5wdXQnKS5jc3Moe2JhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLCB0ZXh0RGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIiwgYm9yZGVyOiBcIm5vbmVcIn0pO1xuICAgICAgICAkKCcuY3NidXR0b24nKS5oaWRlKCkuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgICAgfVxuXG4gICAgICBcbiAgICB9KTtcbiAgfSk7XG5cbiAgJChcIi5jc2lucHV0XCIpLmtleXVwKGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICQoJy5jc2J1dHRvbicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAkKCcuY3NpbnB1dCcpLmJsdXIoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIHNldE1hcFN0eWxlKCkge1xuICAgIGlmIChpc0RheSgpID09IHRydWUpIHtcbiAgICAgIG1hcC5zZXRPcHRpb25zKHtcbiAgICAgICAgICBzdHlsZXM6IGRheVN0eWxlXG4gICAgICB9KTtcbiAgICAgICQoXCIuYm94c3R5bGVcIikuY3NzKFwiY29sb3JcIiwgXCJibGFja1wiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBtYXAuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgc3R5bGVzOiBuaWdodFN0eWxlXG4gICAgICB9KTtcbiAgICAgICQoXCIuYm94c3R5bGVcIikuY3NzKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNEYXkoKSB7XG4gICAgaWYgKHRpbWUgPiBzdW5yaXNlICYmIHRpbWUgPCBzdW5zZXQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0V2VhdGhlckljb24oKSB7XG4gICAgaWYgKHdlYXRoZXIgPT0gXCJDbGVhclwiICYmIGlzRGF5KCkgPT0gdHJ1ZSkge1xuICAgICAgY2xlYXJJY29uKCk7XG4gICAgICAkKFwiLndlYXRoZXJpY29uXCIpLmFkZENsYXNzKFwid2kgd2ktZGF5LXN1bm55XCIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh3ZWF0aGVyID09IFwiQ2xlYXJcIiAmJiBpc0RheSgpID09IGZhbHNlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1uaWdodC1jbGVhclwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2VhdGhlciA9PSBcIkNsb3Vkc1wiICYmIGlzRGF5KCkgPT0gdHJ1ZSkge1xuICAgICAgY2xlYXJJY29uKCk7XG4gICAgICAkKFwiLndlYXRoZXJpY29uXCIpLmFkZENsYXNzKFwid2kgd2ktZGF5LWNsb3VkeVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2VhdGhlciA9PSBcIkNsb3Vkc1wiICYmIGlzRGF5KCkgPT0gZmFsc2UpIHtcbiAgICAgIGNsZWFySWNvbigpO1xuICAgICAgJChcIi53ZWF0aGVyaWNvblwiKS5hZGRDbGFzcyhcIndpIHdpLW5pZ2h0LWNsb3VkeVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2VhdGhlciA9PSBcIlRodW5kZXJzdG9ybVwiICYmIGlzRGF5KCkgPT0gdHJ1ZSkge1xuICAgICAgY2xlYXJJY29uKCk7XG4gICAgICAkKFwiLndlYXRoZXJpY29uXCIpLmFkZENsYXNzKFwid2kgd2ktZGF5LXN0b3JtLXNob3dlcnNcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdlYXRoZXIgPT0gXCJUaHVuZGVyc3Rvcm1cIiAmJiBpc0RheSgpID09IGZhbHNlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1uaWdodC1zdG9ybS1zaG93ZXJzXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh3ZWF0aGVyID09IFwiUmFpblwiICYmIGlzRGF5KCkgPT0gdHJ1ZSkge1xuICAgICAgY2xlYXJJY29uKCk7XG4gICAgICAkKFwiLndlYXRoZXJpY29uXCIpLmFkZENsYXNzKFwid2kgd2ktZGF5LXNob3dlcnNcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdlYXRoZXIgPT0gXCJSYWluXCIgJiYgaXNEYXkoKSA9PSBmYWxzZSkge1xuICAgICAgY2xlYXJJY29uKCk7XG4gICAgICAkKFwiLndlYXRoZXJpY29uXCIpLmFkZENsYXNzKFwid2kgd2ktbmlnaHQtYWx0LXNob3dlcnNcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdlYXRoZXIgPT0gXCJTbm93XCIgJiYgaXNEYXkoKSA9PSB0cnVlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1kYXktc25vd1wiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2VhdGhlciA9PSBcIlNub3dcIiAmJiBpc0RheSgpID09IGZhbHNlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1uaWdodC1hbHQtc25vd1wiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2VhdGhlciA9PSBcIkRyaXp6bGVcIiAmJiBpc0RheSgpID09IHRydWUpIHtcbiAgICAgIGNsZWFySWNvbigpO1xuICAgICAgJChcIi53ZWF0aGVyaWNvblwiKS5hZGRDbGFzcyhcIndpIHdpLWRheS1yYWluLW1peFwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2VhdGhlciA9PSBcIkRyaXp6bGVcIiAmJiBpc0RheSgpID09IGZhbHNlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1uaWdodC1hbHQtcmFpbi1taXhcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdlYXRoZXIgPT0gXCJNaXN0XCIgJiYgaXNEYXkoKSA9PSB0cnVlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1kYXktcmFpbi1taXhcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdlYXRoZXIgPT0gXCJNaXN0XCIgJiYgaXNEYXkoKSA9PSBmYWxzZSkge1xuICAgICAgY2xlYXJJY29uKCk7XG4gICAgICAkKFwiLndlYXRoZXJpY29uXCIpLmFkZENsYXNzKFwid2kgd2ktbmlnaHQtYWx0LXJhaW4tbWl4XCIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh3ZWF0aGVyID09IFwiRm9nXCIgJiYgaXNEYXkoKSA9PSB0cnVlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1kYXktcmFpbi1taXhcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdlYXRoZXIgPT0gXCJGb2dcIiAmJiBpc0RheSgpID09IGZhbHNlKSB7XG4gICAgICBjbGVhckljb24oKTtcbiAgICAgICQoXCIud2VhdGhlcmljb25cIikuYWRkQ2xhc3MoXCJ3aSB3aS1uaWdodC1hbHQtcmFpbi1taXhcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJChcIi53ZWF0aGVyaWNvblwiKS5hZGRDbGFzcyhcIndpIHN0b3JtLXdhcm5pbmdcIik7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldGNzaW5wdXQoKSB7XG4gICAgdmFyIGNzaW5wdXQgPSAkKCcuY3NpbnB1dCcpLnZhbCgpO1xuICAgIGNzaW5wdXQgPSBjc2lucHV0LnRyaW0oKTtcbiAgICBjc2lucHV0ID0gY29udmVydENhc2UoY3NpbnB1dCk7XG4gICAgY3NpbnB1dCA9IGNzaW5wdXQucmVwbGFjZSgvICsoPz0gKS9nLCcnKTtcbiAgICBjc2lucHV0ID0gcmVtb3ZlUHVuY3R1YXRpb24oY3NpbnB1dCk7XG4gICAgbmV3Y3NpbnB1dCA9IGNzaW5wdXQ7XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUHVuY3R1YXRpb24od29yZCkge1xuICAgIHZhciBub3JtID0gd29yZC5yZXBsYWNlKC9bXkEtWmEtejAtOV8uLCAtXS9nLFwiXCIpO1xuICAgIHJldHVybiBub3JtO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNsZWFySWNvbigpIHtcbiAgICAkKCcud2VhdGhlcmljb24nKS5yZW1vdmVDbGFzcyhcIndpIHdpLWRheS1zdW5ueSB3aS1uaWdodC1jbGVhciB3aS1kYXktY2xvdWR5IHdpLW5pZ2h0LWNsb3VkeSB3aS1kYXktc3Rvcm0tc2hvd2VycyB3aS1uaWdodC1zdG9ybS1zaG93ZXJzIHdpLWRheS1zaG93ZXJzIHdpLW5pZ2h0LWFsdC1zaG93ZXJzIHdpLWRheS1zbm93IHdpLW5pZ2h0LWFsdC1zbm93IHdpLWRheS1yYWluLW1peCB3aS1uaWdodC1hbHQtcmFpbi1taXhcIik7XG4gIH07XG5cbiAgZnVuY3Rpb24gY29udmVydENhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHdcXFMqL2csIGZ1bmN0aW9uKHR4dCl7cmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTt9KTtcbiAgfTtcblxuXG5cblxufSk7XG5cbiAgXG4gIFxuXG4gICAgXG4vKlxue1xuICAgXCJhc1wiOlwiQVM3OTIyIENvbWNhc3QgQ2FibGUgQ29tbXVuaWNhdGlvbnMsIExMQ1wiLFxuICAgXCJjaXR5XCI6XCJCb3N0b25cIixcbiAgIFwiY291bnRyeVwiOlwiVW5pdGVkIFN0YXRlc1wiLFxuICAgXCJjb3VudHJ5Q29kZVwiOlwiVVNcIixcbiAgIFwiaXNwXCI6XCJDb21jYXN0IENhYmxlXCIsXG4gICBcImxhdFwiOjQyLjM2MDUsXG4gICBcImxvblwiOi03MS4wNTQ4LFxuICAgXCJvcmdcIjpcIkNvbWNhc3QgQ2FibGVcIixcbiAgIFwicXVlcnlcIjpcIjc2LjExOC4xMC45OVwiLFxuICAgXCJyZWdpb25cIjpcIk1BXCIsXG4gICBcInJlZ2lvbk5hbWVcIjpcIk1hc3NhY2h1c2V0dHNcIixcbiAgIFwic3RhdHVzXCI6XCJzdWNjZXNzXCIsXG4gICBcInRpbWV6b25lXCI6XCJBbWVyaWNhL05ld19Zb3JrXCIsXG4gICBcInppcFwiOlwiMDIxMDlcIlxufVxuaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9NDIuMzQyNCZsb249LTcxLjA4NzgmQVBQSUQ9MDYxZjI0Y2YzY2RlMmY2MDY0NGE4MjQwMzAyOTgzZjJcbntcbiAgXCJjb29yZFwiOntcImxvblwiOi03MS4wOCxcImxhdFwiOjQyLjMzfSxcbiAgXCJ3ZWF0aGVyXCI6W3tcImlkXCI6ODAwLFwibWFpblwiOlwiQ2xlYXJcIixcImRlc2NyaXB0aW9uXCI6XCJjbGVhciBza3lcIixcImljb25cIjpcIjAxZFwifV0sXG4gIFwiYmFzZVwiOlwiY21jIHN0YXRpb25zXCIsXG4gIFwibWFpblwiOntcInRlbXBcIjozMDIuNzUsXCJwcmVzc3VyZVwiOjEwMTguMjA0LFwiaHVtaWRpdHlcIjo0NCxcInRlbXBfbWluXCI6Mjk5LjgyLFwidGVtcF9tYXhcIjozMDQuODJ9LFxuICBcIndpbmRcIjp7XCJzcGVlZFwiOjEuMyxcImRlZ1wiOjEzNSxcImd1c3RcIjo0LjV9LFxuICBcImNsb3Vkc1wiOntcImFsbFwiOjB9LFxuICBcImR0XCI6MTQ3MDMzNTE5MCxcbiAgXCJzeXNcIjp7XCJ0eXBlXCI6MyxcImlkXCI6MTQ0MjcyODQwNyxcIm1lc3NhZ2VcIjowLjAwNDIsXCJjb3VudHJ5XCI6XCJVU1wiLFwic3VucmlzZVwiOjE0NzAzMDM2NzgsXCJzdW5zZXRcIjoxNDcwMzU1MTE0fSxcbiAgXCJpZFwiOjQ5NTIzNDksXG4gIFwibmFtZVwiOlwiU3VmZm9sayBDb3VudHlcIixcbiAgXCJjb2RcIjoyMDBcbn1cbiovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvd2VhdGhlci9qcy93ZWF0aGVyYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMyJdLCJzb3VyY2VSb290IjoiIn0=
