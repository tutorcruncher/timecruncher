(function($) {
  'use strict';
    $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      var id = $anchor.attr('href');
      id = id.replace(/^\//, '');
      $('html, body').stop().animate({
        scrollTop: ($(id).offset().top - 70)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });

  $('.navbar-inverse').affix({
    offset: {
      top: 100
    }
  });

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

})(jQuery);
