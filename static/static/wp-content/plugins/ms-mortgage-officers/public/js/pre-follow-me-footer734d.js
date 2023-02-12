const ms_get_root_domain = function () {
  var current_url = window.location.hostname.split('.');
  var root_domain = current_url.slice(-2).join('.');
  if (root_domain === "localhost") {
      root_domain = `Path=/`;
  } else {
      root_domain = `domain=.${root_domain};Path=/`;
  }
  return root_domain;
};

const ms_destroy_cookie = function(key,is_root_domain = false) {
  let domain = "";
  if (is_root_domain === true) {
      domain = ms_get_root_domain() || `Path=/`;
  } else {
      domain = `Path=/`;
  }
  document.cookie = key +'=; '+ domain +'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

ms_destroy_cookie("loid", true);