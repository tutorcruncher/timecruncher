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
