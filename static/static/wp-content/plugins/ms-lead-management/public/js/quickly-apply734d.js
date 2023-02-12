jQuery(window).on("elementor/frontend/init", (function () {
  var $ = jQuery;
  var widgetName = "quickly-apply-button.default";
  var siteUrl = $("body").data("site-url");

  function get_query() {
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
      qs[i] = qs[i].split('=');
      result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
  }

  var initApplyNowButton = function (id, widgetId) {
    var successMessage = $(id).data('success-message');
    var failedMessage = $(id).data('failed-message');

    var popup = $(id).data('popup');
    var query = get_query();
    if (query.qaresponse && query.qaresponse.length > 0) {
      $("#pum-" + popup).addClass("quickly-apply-popup-wrapper");
      var message = query.qaresponse == "success" ? successMessage : failedMessage;
      if (query.qaresponse == "success") {
        $("#popmake-" + popup).find(".popmake-title").html(`
          <img class="popmake-title-icon" src="${siteUrl + '/wp-content/plugins/ms-lead-management/public/images/qa-check.png'}" />
          <span class="popmake-title-text">Success!</span>
        `);
      } else {
        $("#popmake-" + popup).find(".popmake-title").html(`Failed`);
      }
      
      $("#popmake-" + popup).find(".popmake-close").html(`
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#303E55" class="qla-bi qla-bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      `);

      message = (message || "").replace(/\n/g, "<br />");
      $("#popmake-" + popup).find(".popmake-content").html(message);
      $("#popmake-" + popup).addClass("quickly-apply-popup");
      if (PUM) {
        if(!$(PUM.getPopup(popup)).hasClass("pum-active")) {
          PUM.open(popup);
        }
      }
    }
  }

  elementorFrontend.hooks.addAction("frontend/element_ready/" + widgetName, function ($scope) {
    var id = "#quickly-apply-button-container-" + $($scope).attr('data-id');
    initApplyNowButton(id, $($scope).attr('data-id'));
  });
}))