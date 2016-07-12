$(document).ready(function() {
  var $num_students_slider = $('input[id="num-students"]');
  var $num_students_value = document.getElementById("num-students-val");
  var $hourly_rate_slider = $('input[id="hourly-rate"]');
  var $hourly_rate_value = document.getElementById("hourly-rate-val");
  var $revenue_slider = $('input[id="revenue"]');
  var $revenue_slider_value = document.getElementById("revenue-val");

  var $time_saved = document.getElementById("time-saved");
  var $admin_money_saved = document.getElementById("admin-money-saved");
  var $tc_price = document.getElementById("tc-price");
  var $final_price = document.getElementById("final-price");
  var $tier = document.getElementById("tier");

  // Calculated at 1 hour per student per month
  var time_saved_per_student = 1.5;
  var tier;


  function calculate_tc_price(revenue) {
    function parse_to_float(v) {
      return parseFloat(v.replace(/[^\d.-]/g, ''));
    }
    var startup_base_fee = base_price_us[1].replace(/[^\d.-]/g, '');
    var payg_percentage = (parse_to_float(payg['revenue_percentage'])) / 100;
    var startup_percentage = (parse_to_float(startup['revenue_percentage'])) / 100;

    var payg_usage_fee = (payg_percentage * revenue);
    var startup_usage_fee = parse_to_float(startup_base_fee.replace(/[^\d.-]/g, '')) + (startup_percentage * revenue);

    if (payg_usage_fee < startup_usage_fee) {
      tier = payg;
      return parseFloat(payg_usage_fee).toFixed(0);
    } else {
      tier = startup;
      return parseFloat(startup_usage_fee).toFixed(0);
    }
  }

  function update_calculations() {
    var hours_saved = time_saved_per_student * $num_students_slider.val();
    var money_saved = hours_saved * $hourly_rate_slider.val();

    $time_saved.innerText = hours_saved.toFixed(0) + ' Hours';
    $admin_money_saved.innerText = '$' + (money_saved.toFixed(0));

    var tc_price = calculate_tc_price($revenue_slider.val());
    $tc_price.innerHTML = '$' + tc_price;
    $final_price.innerHTML = '$' + (money_saved - tc_price).toFixed(0);
    $tier.innerHTML = tier['name'];
  }

  $hourly_rate_slider
    .rangeslider({
      polyfill: false,
      onInit: function () {
        $hourly_rate_value.textContent = '$' + this.value;
        update_calculations();
      }
    })
    .on('input', function () {
      $hourly_rate_value.textContent = '$' + this.value;
      update_calculations();
    });

  $revenue_slider
    .rangeslider({
      polyfill: false,
      onInit: function () {
        $revenue_slider_value.textContent = '$' + this.value;
        $("#contact-us-message").hide();
        update_calculations();
      }
    })
    .on('input', function () {
      if (this.value == this.max) {
        $revenue_slider_value.textContent = '$' + this.value + '+';
        $("#price-calculation").hide();
        $tier = 'Enterprise';
        $("#contact-us-message").show();
      }
      else {
        $revenue_slider_value.textContent ='$' + this.value;
        $("#price-calculation").show();
        $("#contact-us-message").hide();
        update_calculations();
      }
    });

  $num_students_slider
    .rangeslider({
      polyfill: false,
      onInit: function () {
        $num_students_value.textContent = this.value;
        $("#contact-us-message").hide();
        update_calculations();
      }
    })
    .on('input', function () {
      if (this.value == this.max) {
        $num_students_value.textContent = this.value + '+';
        $("#price-calculation").hide();
        $tier = 'Enterprise';
        $("#contact-us-message").show();
      }
      else {
        $num_students_value.textContent = this.value;
        $("#price-calculation").show();
        $("#contact-us-message").hide();
        update_calculations();
      }
    });

});
