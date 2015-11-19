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

  videojs('demo_video').ready(function() {
    var myPlayer = this;
    var aspectRatio = 5 / 12; // aspect ratio 12:5 (video frame 960x400)
    function resizeVideoJS() {
        var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
        myPlayer.width(width).height(width * aspectRatio);
    }
    resizeVideoJS();
    window.onresize = resizeVideoJS;
  });

})(jQuery);
