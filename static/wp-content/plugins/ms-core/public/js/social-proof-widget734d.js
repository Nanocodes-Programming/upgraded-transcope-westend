jQuery(window).on("elementor/frontend/init", (function () {
  var $ = jQuery;
  var widgetName = "social-proof.default";
  var initSocialProofWidget = function (id, widgetId) {
    var items = $(id).data("items");
    var speed = $(id).data("speed");
    initSocialProof(id.replace("#", ""), items, { speed });
    startSocialProofAnimation();
  }

  elementorFrontend.hooks.addAction("frontend/element_ready/" + widgetName, function ($scope) {
    var id = "#social-proof-container-" + $($scope).attr('data-id');
    initSocialProofWidget(id, $($scope).attr('data-id'));
  });
}))