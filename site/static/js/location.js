function init_map() {
  var pos_us = {lat: 43.8985938, lng: -79.432076};
  var pos_gb = {lat: 51.498146, lng: -0.144880};

  var map_us = new google.maps.Map(document.getElementById('map_us'), {
    center: pos_us,
    scrollwheel: false,
    zoom: 12
  });
  new google.maps.Marker({
      map: map_us,
      position: pos_us,
      title: 'TutorCruncher US'
  });

  var map_gb = new google.maps.Map(document.getElementById('map_gb'), {
    center: pos_gb,
    scrollwheel: false,
    zoom: 12
  });
  new google.maps.Marker({
      map: map_gb,
      position: pos_gb,
      title: 'TutorCruncher GB'
  });
}
