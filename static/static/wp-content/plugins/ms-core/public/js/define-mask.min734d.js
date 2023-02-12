jQuery(document).ready(function ($) {
  var maskInit = function() {
    $('.phone_us').mask('(000) 000-0000');
    $(".phone_us_input").inputmask({ "mask": "(999) 999-9999" });
    $(".number_input").inputmask("9", { repeat: 9 });
  }
  maskInit();
  window.maskInit = maskInit;
});