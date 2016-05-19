$(document).ready(function() {
  var $num_students_slider = $('input[id="num-students"]');
  var $num_students_value = document.getElementById('num-students-val');
  var $hourly_rate_slider = $('input[id="hourly-rate"]');
  var $hourly_rate_value = document.getElementById('hourly-rate-val');

  function update_calculations() {
    
  }

  function updateOutput(el, val) {
    el.textContent = val;
    update_calculations()
  }

  $num_students_slider
    .rangeslider({
      polyfill: false,
      onInit: function() {
        updateOutput($num_students_value, this.value);
      }
    })
    .on('input', function() {
      updateOutput($num_students_value, this.value);
    });

  $hourly_rate_slider
    .rangeslider({
      polyfill: false,
      onInit: function () {
        updateOutput($hourly_rate_value, this.value);
      }
    })
    .on('input', function() {
      updateOutput($hourly_rate_value, this.value);
    })
});
