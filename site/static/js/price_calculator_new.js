$(document).ready(function() {
  var $num_students_slider = $('input[id="num-students"]');
  var $num_students_value = $('#num-students-val');
  var $hourly_rate_slider = $('input[id="hourly-rate"]');
  var $hourly_rate_value = $('#hourly-rate-val');
  var $revenue_slider = $('input[id="revenue"]');
  var $revenue_slider_value = $('#revenue-val');

  var $time_saved = $('#time-saved');
  var $admin_money_saved = $('#admin-money-saved');
  var $tc_price = $('#tc-price');
  var $final_price = $('#final-price');
  var $tier = $('#tier');
  var $price_calcs = $('#price-calculation');
  var $contact_us = $('#contact-us-message');

  // Calculated at 1 hour per student per month
  var time_saved_per_student = 1.5;
  var tier;
  var lock_tier = false;


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

    $time_saved.text(hours_saved.toFixed(0) + ' Hours');
    $admin_money_saved.text('$' + (money_saved.toFixed(0)));

    var tc_price = calculate_tc_price($revenue_slider.val());
    $tc_price.text('$' + tc_price);
    var tc_cost = tc_price - money_saved;
    var price_prefix = tc_cost < 0 ? '-' : '';
    $final_price.text(price_prefix + '$' + Math.abs(tc_cost).toFixed(0));
    if (!lock_tier){
      $tier.text(tier['name']);
    }
  }
  update_calculations();

  $hourly_rate_slider.rangeslider({
      polyfill: false,
      onInit: function () {
        $hourly_rate_value.text('$' + this.value);
      }
    })
    .on('input', function () {
      $hourly_rate_value.text('$' + this.value);
      update_calculations();
    });

  $revenue_slider.rangeslider({
      polyfill: false,
      onInit: function () {
        $revenue_slider_value.text('$' + this.value);
      }
    })
    .on('input', function () {
      if (this.value == this.max) {
        $revenue_slider_value.text('$' + this.value + '+');
        $tier.text('Enterprise');
        lock_tier = true;
        $price_calcs.hide();
        $contact_us.show();
      }
      else {
        $revenue_slider_value.text('$' + this.value);
        lock_tier = false;
        update_calculations();
        $price_calcs.show();
        $contact_us.hide();
      }
    });

  $num_students_slider.rangeslider({
      polyfill: false,
      onInit: function () {
        $num_students_value.text(this.value);
      }
    })
    .on('input', function () {
      if (this.value == this.max) {
        $num_students_value.text(this.value + '+');
        $tier.text('Enterprise');
        lock_tier = true;
        $price_calcs.hide();
        $contact_us.show();
      }
      else {
        $num_students_value.text(this.value);
        lock_tier = false;
        update_calculations();
        $price_calcs.show();
        $contact_us.hide();
      }
    });
});
