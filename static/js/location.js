function init_map() {
  var pos = get_coords(country);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    scrollwheel: false,
    zoom: 12
  });
  new google.maps.Marker({
      map: map,
      position: pos,
      title: 'TutorCruncher'
  });
}

function get_coords(country) {
  var gb_coords = {lat: 51.498146, lng: -0.144880};
  var us_coords = {lat: 43.8985938, lng: -79.432076};
  if (country == 'us') {
    return us_coords;
  }
  else {
    return gb_coords;
  }
}

function get_location() {
  var language = window.navigator.userLanguage || window.navigator.language;
  var timezone = parseInt(new Date().getTimezoneOffset()/60);
  if (['en-US', 'en-GB'].indexOf(language) >= 0 && [-1, 0].indexOf(timezone) >= 0) {
    return 'uk'
  }
  else if (-2 <= timezone && timezone <= 4) {
    return 'eu'
  }
  else {
    return 'us'
  }
}

function load_pricing(tiers) {
  var country = get_location();
  var tier_names = ['Basic', 'Premium', 'Enterprise'];
  tier_names.forEach(function (tier_name) {
    for (var i = 0; i < tiers.length; i++) {
      if (tiers[i].name === tier_name) {
        var tier = tiers[i];
        var price = 'price_' + country;
        var currency = document.getElementById('currency-' + tier_name);
        currency.innerHTML = tier[price].currency;
        var amount = document.getElementById('amount-' + tier_name);
        amount.innerHTML = tier[price].amount;
      }
    }
  });
}
