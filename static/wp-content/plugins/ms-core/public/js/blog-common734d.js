jQuery( document ).ready(function() {
  var $ = jQuery;
  let token= sessionStorage.getItem("token") || '';
  let siteUrl = $("body").data("site-url");
  var a = document.getElementById('btn_back_to_blog');
  if (a) {
    if (token) {
      $(a).unbind("click");
      $(a).click(function(e) {
        e.preventDefault();
        history.back();
      });
    } else {
      $(a).unbind("click");
      a.href = siteUrl + '/blog';
    }
  }
});
