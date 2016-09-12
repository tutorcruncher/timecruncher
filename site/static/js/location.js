function init_map() {
  var pos_ca = {lat: 43.8985938, lng: -79.432076};
  var pos_gb = {lat: 51.498146, lng: -0.144880};
  var pos_us = {lat: 34.388863, lng: -118.566141};

  var map_ca = new google.maps.Map(document.getElementById('map_ca'), {
    center: pos_ca,
    scrollwheel: false,
    zoom: 12
  });
  new google.maps.Marker({
      map: map_ca,
      position: pos_ca,
      title: 'TimeCruncher CA'
  });

  var map_us = new google.maps.Map(document.getElementById('map_us'), {
    center: pos_us,
    scrollwheel: false,
    zoom: 12
  });
  new google.maps.Marker({
      map: map_us,
      position: pos_us,
      title: 'TimeCruncher US'
  });

  var map_gb = new google.maps.Map(document.getElementById('map_gb'), {
    center: pos_gb,
    scrollwheel: false,
    zoom: 12
  });
  new google.maps.Marker({
      map: map_gb,
      position: pos_gb,
      title: 'TimeCruncher GB'
  });
}
