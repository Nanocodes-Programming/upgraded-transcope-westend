jQuery(window).on("elementor/frontend/init", (function () {
  var $ = jQuery;
  var applyNowButton = "ms-button.default";
  var initApplyNowButton = function (id, widgetId) {
  }

  elementorFrontend.hooks.addAction("frontend/element_ready/" + applyNowButton, function ($scope) {
    var id = "#ms-button-container-" + $($scope).attr('data-id');
    initApplyNowButton(id, $($scope).attr('data-id'));
  });
}))