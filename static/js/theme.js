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
  var pos = {lat: 51.498146, lng: -0.144880};
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


$(document).ready(function () {
  $('img[class="lightboximage"]').each(function () {
    var file = $(this).attr('src');
    var alttext= $(this).attr('alt-text');
    var image = '<a href="' + file + '" data-lightbox="lightbox" data-title="' + alttext + '" class="thumbnail"><img alt-text="' + alttext + '" src="' + file + '"/></a>';
    $(this).replaceWith(image);
  });
});
