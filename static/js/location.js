function init_map() {
  var pos = get_coords();
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

function get_coords() {
  var uk_coords = {lat: 51.498146, lng: -0.144880};
  var ca_coords = {lat: 43.8985938, lng: -79.432076};
  if (get_location() == 'us') {
    pos = ca_coords
  }
  else {
    pos = uk_coords
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

function get_price() {
  var country = get_location();
  tier_names = ['Basic', 'Premium', 'Enterprise'];
  tier_names.forEach(function (tier_name) {
    for (var i = 0; i < tiers.length; i++) {
      if (tiers[i].name === tier_name) {
        var tier = tiers[i];
        var price = 'price_' + country;
        var currency = document.getElementsByClassName("currency-" + tier_name);
        [].slice.call(currency).forEach(function (c) {
          c.innerHTML = tier[price].currency;
        });
        var amount = document.getElementById("amount-" + tier_name);
        amount.innerHTML = tier[price].amount;
        var amount_pas = document.getElementById("amount-pas-" + tier_name);
        if (amount_pas) {
          amount_pas.innerHTML = tier[price].amount_pas;
        }
      }
    }
  });
}

get_price();
