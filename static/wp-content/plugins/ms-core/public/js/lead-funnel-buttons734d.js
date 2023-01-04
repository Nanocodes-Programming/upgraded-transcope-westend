jQuery(document).ready(function ($) {
  const getCookie = function (cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  let data_url_pricing = g_pricing_page_url;
  let data_url_apply_link = g_apply_link;
  let data_not_complete_pricing_url = g_not_complete_pricing_url;
  let data_not_complete_apply_url = g_not_complete_apply_url;

  let cookieLeadFunnel =
    getCookie("hasCompletedLeadFunnel") == "true" ? true : false;

  let ms_apply_now = $(".ms-apply-now");
  let ms_pricing_link = $(".ms-pricing-link");

  if (!cookieLeadFunnel) {
    if (ms_pricing_link) {
      ms_pricing_link.find("a").attr("href", data_not_complete_pricing_url);
    }

    if (ms_apply_now) {
      ms_apply_now.find("a").attr("href", data_not_complete_apply_url);
    }
  } else {
    if (ms_pricing_link) {
      ms_pricing_link.find("a").attr("href", data_url_pricing);
    }

    if (ms_apply_now) {
      ms_apply_now.find("a").attr("href", data_url_apply_link);
    }
  }

  $("a[data-action=show-me-rates]").unbind("click");
  $("a[data-action=show-me-rates]").click(function () {
    var redirectUrl = $(this).attr("href");
    var disableLeadFunnel = $(this).data("disable-lead-funnel");
    if (!cookieLeadFunnel && disableLeadFunnel == "no") {
      var redirectUrl = data_not_complete_pricing_url;
    }
    if ($(this).attr("target") == "_blank") {
      window.open(redirectUrl);
    } else {
      window.location.href = redirectUrl;
    }
  });

  $("a[data-action=apply-now]").unbind("click");
  $("a[data-action=apply-now]").click(function () {
    var redirectUrl = $(this).attr("href");
    var disableLeadFunnel = $(this).data("disable-lead-funnel");
    if (!cookieLeadFunnel && disableLeadFunnel == "no") {
      var redirectUrl = data_not_complete_apply_url;
    }
    if ($(this).attr("target") == "_blank") {
      window.open(redirectUrl);
    } else {
      window.location.href = redirectUrl;
    }
  });

  if (!cookieLeadFunnel) {
    $(".ms-pricing-lead-funnel-link")
      .find("a")
      .attr("href", data_not_complete_pricing_url);
    $(".ms-apply-lead-funnel-link")
      .find("a")
      .attr("href", data_not_complete_apply_url);
  }
});
