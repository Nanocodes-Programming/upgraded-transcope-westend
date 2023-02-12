jQuery(function ($) {
  $(".ms_img_box_tooltip").each(function () {
    var iconTag =
      '<img class="tooltip-img" src="/wp-content/themes/ms-theme/assets/images/info-circle.png" alt="">';
    $("div[data-id=" + $(this).data("widget-id") + "]")
      .find(".elementor-image-box-description")
      .append(
        '<div class="has-tooltip">' +
          iconTag +
          '<span class="tooltip">' +
          $(this).val() +
          '<span class="triangle"></span></span></div>'
      );
  });
});

