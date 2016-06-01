$(document).ready(function() {
  var $num_students_slider = $('input[id="num-students"]');
  var $hourly_rate_slider = $('input[id="hourly-rate"]');
  var $num_students_value = document.getElementById("num-students-val");
  var $hourly_rate_value = document.getElementById("hourly-rate-val");
  var $time_saved = document.getElementById("time-saved");
  var $admin_money_saved = document.getElementById("admin-money-saved");
  var $tc_price = document.getElementById("tc-price");
  var $final_price = document.getElementById("final-price");

  // Calculated at 1 hour per student per month
  var time_saved_per_student = 1.5;

  function calculate_tc_price(num_students) {
    var basic_cap = basic['cap'];
    var basic_amount = basic['price_us']['amount'];
    var premium_amount = premium['price_us']['amount'];
    var price_per_student = premium['price_us']['amount_pas'];

    var usage_fee = num_students * price_per_student;
    if (num_students < basic_cap) {
      return (usage_fee + basic_amount).toFixed(0);
    }
    else if (num_students >= basic_cap) {
       return (usage_fee + premium_amount).toFixed(0);
    }
  }

  function update_calculations() {
    var hours_saved = time_saved_per_student * $num_students_slider.val();
    var money_saved = hours_saved * $hourly_rate_slider.val();

    var tc_price = calculate_tc_price($num_students_slider.val());
    $time_saved.innerText = hours_saved.toFixed(0) + ' Hours';
    $admin_money_saved.innerText =  '$' + (money_saved.toFixed(0));
    $tc_price.innerHTML =  '$' + tc_price;
    $final_price.innerHTML = '$' + (money_saved - tc_price).toFixed(0);
  }

  $num_students_slider
    .rangeslider({
      polyfill: false,
      onInit: function() {
        $num_students_value.textContent = this.value;
        $("#contact-us-message").hide();
        update_calculations();
      }
    })
    .on('input', function() {
      if (this.value == this.max) {
        $num_students_value.textContent = this.value + '+';
        $("#price-calculation").hide();
        $("#contact-us-message").show();
      }
      else {
        $num_students_value.textContent = this.value;
        $("#price-calculation").show();
        $("#contact-us-message").hide();
        update_calculations();
      }
    });

  $hourly_rate_slider
    .rangeslider({
      polyfill: false,
      onInit: function () {
        $hourly_rate_value.textContent = '$' + this.value;
        update_calculations();
      }
    })
    .on('input', function() {
      $hourly_rate_value.textContent = '$' + this.value;
      update_calculations();
    })
});
