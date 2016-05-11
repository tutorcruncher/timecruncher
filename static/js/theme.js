(function($) {
  'use strict';
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    var id = $anchor.attr('href');
    id = id.replace(/^\//, '');
    var el = $(id);
    var top_adjust = el.data('top-adjust') || 0;
    $('html, body').stop().animate({
      scrollTop: $(id).offset().top - top_adjust
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });

  $('.navbar-inverse').affix({
    offset: {
      top: 100
    }
  });

  if (typeof(videojs) != 'undefined') {
    videojs('promo_video').ready(function () {
      var player = this;

      function resizeVideoJS() {
        var width = document.getElementById(player.id()).parentElement.offsetWidth;
        player.width(width);
        if ($(document).width() >= 992) {
          player.height(width * 5 / 12);
        }
      }

      resizeVideoJS();
      window.onresize = resizeVideoJS;
    });
  }
})(jQuery);

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
  var timezone = new Date().getTimezoneOffset()/60;
  if ((language == 'en-US' && timezone == ('-1' || '0')) || language == 'en-GB') {
    return 'uk'
  }
  else if (['en-US', 'fr-CA', 'en-CA'].indexOf(language) >= 0) {
    return 'us'
  }
  else {
    return 'eu'
  }
}

$(document).ready(function () {
  $('img[class="lightboximage"]').each(function () {
    var file = $(this).attr('src');
    var alttext= $(this).attr('alt-text');
    var image = '<a href="' + file + '" data-lightbox="lightbox" data-title="' + alttext + '" class="thumbnail"><img alt-text="' + alttext + '" src="' + file + '"/></a>';
    $(this).replaceWith(image);
  });
});


var loadDeferredStyles = function() {
  var addStylesNode = document.getElementById("deferred-styles");
  var replacement = document.createElement("div");
  replacement.innerHTML = addStylesNode.textContent;
  document.body.appendChild(replacement);
  addStylesNode.parentElement.removeChild(addStylesNode);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener('load', loadDeferredStyles);
