jQuery(document).ready(function ($) {
  // keep query params when redirect
  document.addEventListener("click", (e) => {
    const origin = e.target.closest("a");
    let urlParams = window.location.search;
    if (origin && urlParams) {
      urlParams = get_param_have_prefix(urlParams);
      let origin_href = origin.href;
      if (origin_href.includes("?")) {
        urlParams = urlParams.replace("?", "&");
      }
      origin.href += urlParams;
    }
  });

  const get_param_have_prefix = function (query_param) {
    let searchParams = new URLSearchParams(query_param);
    let param_query_have_prefix = "?";
    var key_first = true;
    for (var key of searchParams.keys()) {
      if (
        key.includes("utm_") ||
        ["root", "ref_id", "gclid", "fbclid", "msclkid"].includes(key)
      ) {
        if (key_first === true) {
          param_query_have_prefix += key + "=" + searchParams.get(key);
          key_first = false;
        } else {
          param_query_have_prefix += "&" + key + "=" + searchParams.get(key);
        }
      }
    }
    if (param_query_have_prefix == "?") {
      return "";
    }
    return param_query_have_prefix;
  };
});
