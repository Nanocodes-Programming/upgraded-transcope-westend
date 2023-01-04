jQuery(document).ready(function ($) {
  $(".link-animate-dark").mouseover(function() {
    var siteUrl = $("body").data("site-url");
    $(this).find("p").css("color","#096BB7");
    $(this).find("img").attr("src", siteUrl + "/wp-content/assets/images/two-arrow-primary-hover.svg");
  });

  $(".link-animate-dark").mouseout(function() {
    var siteUrl = $("body").data("site-url");
    $(this).find("p").css("color","#1988DE");
    $(this).find("img").attr("src", siteUrl + "/wp-content/assets/images/two-arrow-primary.svg");
  });

  $(".link-animate-dark").mousedown(function() {
    var siteUrl = $("body").data("site-url");
    $(this).find("p").css("color","#1E417B");
    $(this).find("img").attr("src", siteUrl + "/wp-content/assets/images/two-arrow-primary-active.svg");
  });

  $(".close-btn-popup-maker").click(function () {
        $(".popmake-close").click();
  });

  $(window).on('load', function () {
    let openURLAccessibility = window.location.href.toString();
    if(openURLAccessibility.indexOf("#fb-ada-accessibility-statement") !== -1){
      let openAccessibility = $('a[href*="#fb-ada-accessibility-statement"]') || '';
      if(openAccessibility){
        openAccessibility.click();
      }
    }
    let openURLMakePayment = window.location.href.toString();
    if(openURLMakePayment.indexOf("#fb-make-payment-online") !== -1){
      let openMakePayment = $('a[href*="#fb-make-payment-online"]') || '';
      if(openMakePayment){
        openMakePayment.click();
      }
    }
    let openPopupURLModal = window.location.href.toString();
    if(openPopupURLModal.indexOf("#ms-learn-modal") !== -1){
      let openPopupURLModal = $('a[href*="#ms-learn-modal"]') || '';
      if(openPopupURLModal){
        openPopupURLModal.click();
      }
    }
  });

  jQuery(document).ready(function ($) {
    let copied = $( ".ms-copied-popup" );
    if(copied){
      $( ".ms-copied-popup" ).on('click', function(event){
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(window.location.href.toString()).select();
        document.execCommand("copy");
        $temp.remove();
      });
      
      var popupTimeout = "";
      $('#pum-1058').on('pumAfterOpen', function () {
        var $popup = $(this);
        if (popupTimeout) {
          clearTimeout(popupTimeout);
        }
        popupTimeout = setTimeout(function () {
          $popup.popmake('close');
        }, 5000);
      });
    }

    let phoneFocus = $(".phone-focus-poniter-keyboard");
    if(phoneFocus){
      phoneFocus.find('input').click(function (e) {
        phoneFocus.find('input').focus();
      });
    }

    let leaveSite = $( ".ms-leave-this-site" );
    let leaveSiteElementor = $( ".ms-leave-this-site-elementor" );
    if(leaveSite){
      leaveSite.click(function(e) {
        e.preventDefault();
        let href = $(this).attr('href') || '#';
        $(".ms-leave-site-continue").attr('href',href);
      });
    }

    if (leaveSiteElementor) {
      leaveSiteElementor.click(function(e) {
        e.preventDefault();
        let href = $(this).find('a').attr('href') || '#';
        $(".ms-leave-site-continue").attr('href',href);
      });
    }
  });

  // Save homeUrl and refUrl in browser
  var home_url = window.location.origin;
  var thank_you_url = window.location.origin + "/" + $("body").data("thank-you");
  var ref_url = window.location.origin + window.location.pathname;
  var current_url = window.location.hostname.split('.');
  var root_domain = current_url.slice(-2).join('.');
  var expires_cookie = new Date();
  var milisecond_in_a_day = 86400000;
  expires_cookie.setTime(expires_cookie.getTime() + (milisecond_in_a_day * 30 * 2));
  document.cookie = 'homeUrl' + "=" + home_url + ";expires=" + expires_cookie + ";domain=."+root_domain+";path=/";
  document.cookie = 'refUrl' + "=" + ref_url + ";expires=" + expires_cookie + ";domain=."+root_domain+";path=/";
  document.cookie = 'thankyouUrl' + "=" + thank_you_url + ";expires=" + expires_cookie + ";domain=." + root_domain+";path=/";

  // Number counter animation
  function countDecimalPlaces(value) {
    let text = value.toString()

    if (text.indexOf('e-') > -1) {
      let [base, trail] = text.split('e-');
      let deg = parseInt(trail, 10);
      return deg;
    }

    if (Math.floor(value) !== value) {
      return value.toString().split(".")[1].length || 0;
    }
    return 0;
  }

  function counter(selector, start = 0, end = 0, duration = 100, decimalPlaces = null, selectorAnim = null) {
    let step = Math.abs(end - start) / duration;
    let current = start;
    let delayStart = 40;
    let iDelayStart = 0;

    if (!decimalPlaces || decimalPlaces < 0) {
      decimalPlaces = countDecimalPlaces(end);
    }

    let timer = setInterval(() => {
      $(selector).text(current.toLocaleString('en-US'));

      if (selectorAnim) {
        selectorAnim.addClass('counting');
      }

      if (iDelayStart < delayStart) {
        iDelayStart += 1;
      } else {
        if (start < end) {
          current += step;
          current = Math.round(current * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

          if (current < end) {
            $(selector).text(current.toLocaleString('en-US'));
          } else {
            $(selector).text(end.toLocaleString('en-US'));

            if (selectorAnim) {
              selectorAnim.removeClass('counting');
            }
            clearInterval(timer);
          }
        } else {
          current -= step;
          current = Math.round(current * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

          if (current > end) {
            $(selector).text(current.toLocaleString('en-US'));
          } else {
            $(selector).text(end.toLocaleString('en-US'));

            if (selectorAnim) {
              selectorAnim.removeClass('counting');
            }
            clearInterval(timer);
          }
        }
      }
    }, 1);
  }  
  
  $(document).ready(function () {
    $('.ms-counter').each(function () {
      counterFrom = $(this).data('counter-from');
      counterTo = $(this).data('counter-to');

      if (!counterFrom) counterFrom = 0;

      if (!counterTo) counterTo = 0;

      counter(this, counterFrom, counterTo);
    });

    $('.ms-counter-calculator').on('datachanged', function() {
      $('.ms-counter-calculator').each(function () {
        counterFrom = $(this).data('counter-from');
        counterTo = $(this).data('counter-to');
  
        if (!counterFrom) counterFrom = 0;
  
        if (!counterTo) counterTo = 0;

        counter(this, counterFrom, counterTo, undefined, undefined, $('.rg-calculator-result'));
      });
    });
  });
});

