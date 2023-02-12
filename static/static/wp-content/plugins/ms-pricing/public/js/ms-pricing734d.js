jQuery(document).ready(function ($) {
  $(".money").inputmask({
    alias: "decimal",
    groupSeparator: ",",
    allowMinus: false,
    prefix: "$ ",
    rightAlign: false,
  });
  $(".zip-code").inputmask({ mask: "9{*}" });
});

jQuery(window).on("elementor/frontend/init", function () {
  var $ = jQuery;

  function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString.indexOf("?") >= 0 ? queryString.substr(queryString.indexOf("?") + 1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  function initPricingWidget(id, widgetId) {
    var loanPurpose = $(id).data("loan-purpose");
    var bathUrl = $(id).data("base-url");
    var pathUrl = $(id).data("path-url");
    var openNewWindow = $(id).data("open-new-window");
    var homeUrl = $(id).data("home-url");
    var refUrl = $(id).data("ref-url");
    var quickApplyBaseUrl = $(id).data("quick-apply-base-url");
    var quickApplyPathUrl = $(id).data("quick-apply-path-url");

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    $(id).find(".pricing-button").click(function() {
      let cookieLeadFunnel = getCookie('hasCompletedLeadFunnel') == "true" ? true : false;
      if (!cookieLeadFunnel) {
        let quickApplyUrl = quickApplyBaseUrl + quickApplyPathUrl;
        if (openNewWindow) {
          window.open(quickApplyUrl);
        } else {
          window.location.href = quickApplyUrl;
        }
        return;
      }
      var remainingBalanceField = $(id).find(".remaining-balance-field").val();
      remainingBalanceField = remainingBalanceField.replace(/[$\s,.]/g, "");
      var zipcodeField = $(id).find(".zip-code-field").val();
      
      var pricingUrl = bathUrl + "?" + pathUrl;
      pricingUrl = pricingUrl.replace("{{loan_purpose}}", loanPurpose);
      pricingUrl = pricingUrl.replace("{{zip_code}}", zipcodeField);
      if (loanPurpose == "Purchase") {
        pricingUrl = pricingUrl.replace("{{purchase_price}}", remainingBalanceField);
      } else {
        pricingUrl = pricingUrl.replace("{{remaining_balance}}", remainingBalanceField);
        pricingUrl = pricingUrl.replace("{{calculate_home_value_flag}}", true);
      }
      pricingUrl = pricingUrl.replace("{{home_url}}", homeUrl);
      pricingUrl = pricingUrl.replace("{{ref_url}}", refUrl);

      var referenceId = getCookie("referenceId");
      if (referenceId) {
        referenceId = encodeURIComponent(referenceId);
        pricingUrl = pricingUrl.replace("{{reference_id}}", referenceId);
      }

      var pricingQuery = parseQuery(pricingUrl);
      var pricingStrQuery = "";
      for (var property in pricingQuery) {
        if (!(pricingQuery[property].indexOf("{{") >= 0 && pricingQuery[property].indexOf("}}") >= 0)) {
          pricingStrQuery += property + "=" + encodeURIComponent(pricingQuery[property]) + "&";
        }
      }
      pricingStrQuery = pricingStrQuery.slice(0, -1);
      pricingUrl = bathUrl + "?" + pricingStrQuery;

      if (window && window.location && window.location.search) {
        pricingUrl += window.location.search.replace("?", "&");
      }

      if (openNewWindow) {
        window.open(pricingUrl);
      } else {
        window.location.href = pricingUrl;
      }
    });
  }

  elementorFrontend.hooks.addAction('frontend/element_ready/ms-pricing.default', function ($scope) {
    var id = "#pricing-widget-container-" + jQuery($scope).attr('data-id');
    initPricingWidget(id, jQuery($scope).attr('data-id'));
  });
});
