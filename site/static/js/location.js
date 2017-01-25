/* globals locations */
function init_map() {
  var gb_location = get_company('gb');
  var us_location = get_company('us');
  create_map(gb_location);
  create_map(us_location);

  function get_company(name) {
    return $.grep(locations, function (loc) {
      return loc.location_name == name;
    })[0]
  }

  function create_map(locat) {
    var _loc = {'lat': locat.lat, 'lng': locat.lng};
    var map = new google.maps.Map(document.getElementById(locat.map_id), {
      center: _loc,
      scrollwheel: false,
      zoom: 12
    });
    var infoWindow = new google.maps.InfoWindow({
      content: '<div><strong>' + locat.name + '</strong><br>' + locat.address + '<br>' + locat.phone + '</div>'
    });
    var marker = new google.maps.Marker({
      map: map,
      position: _loc,
      title: locat.title,
      infoWindow: infoWindow
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });
    infoWindow.open(map, marker);
  }
}
