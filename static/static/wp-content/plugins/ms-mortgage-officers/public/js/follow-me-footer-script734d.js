jQuery(document).ready(function($) {
  var adminUrl = $("body").data("admin-ajax");

  const ms_store_get_cookie = function(cname) {
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
  };

  const ms_store_cookie = function(key,value,exp_month = 2) {
    var current_url = window.location.hostname.split('.');
    var root_domain = current_url.slice(-2).join('.');
    if (root_domain === "localhost") {
        root_domain = "";
    } else {
        root_domain = `;domain=.${root_domain};path=/`;
    }
    var expires_cookie = new Date();
    var milisecond_in_a_day = 86400000;
    expires_cookie.setTime(expires_cookie.getTime() + (milisecond_in_a_day * 30 * exp_month));
    document.cookie = key + "=" + value + ";expires=" + expires_cookie + root_domain;
  };

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

  var urlParams = window.location.search;
  var searchParams = new URLSearchParams(urlParams);
  var loAppIdFromQuery = searchParams.get("loid");

  if (loAppIdFromQuery) {
    ms_store_cookie("loid", loAppIdFromQuery);
    ms_destroy_cookie("wordpress_last_visit_lo");
  }

  var loAppId = loAppIdFromQuery || ms_store_get_cookie("loid");
  var loId = ms_store_get_cookie("wordpress_last_visit_lo");

  $.ajax({
    type: "post",
    dataType: "json",
    url: adminUrl,
    data: {
      action: "lo_data",
      lo_app_id: loAppId,
      lo_id: loId,
    },
    context: this,
    beforeSend: function () {
      if ($("#ms-page-loading").length > 0) {
        $("#ms-page-loading").show();
      }
      if ($("#gform_submit_button_3").length > 0) {
        $("#gform_submit_button_3").prop("disabled", true);
      }
      if ($("#gform_submit_button_10").length > 0) {
        $("#gform_submit_button_10").prop("disabled", true);
      }
      if ($("#gform_submit_button_1403").length > 0) {
        $("#gform_submit_button_1403").prop("disabled", true);
      }
    },
    success: function (response) {
      var loan_officer = response.data.loan_officer;
      var te_email_default = response.data.te_email_default;
      if (loan_officer != null && loan_officer.id != null) {
        var role = loan_officer.lo_roles;
        var phone_number = loan_officer.lo_phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        var myvar = 
          '<div id="follow-me-footer" class="follow-me-footer" style="display:none;">' +
          '  <div class="container follow-me-container">' +
          '    <div class="follow-me-row">' +
          '      <div class="follow-me-col-1">' +
          '        <a id="footer-link-lo" href="'+loan_officer.lo_permalink+'">' +
          '          <img class="follow-me-image" src="'+loan_officer.lo_ft_image+'" alt="'+loan_officer.lo_first_name+' '+loan_officer.lo_last_name+'" />' +
          '        </a>' +
          '      </div>' +
          '      <div class="follow-me-col-2">' +
          '       <div class="follow-me-col-name">' +
          '        <div class="name"><a id="footer-lo-name" href="' + loan_officer.lo_permalink + '">'+loan_officer.lo_first_name+' '+loan_officer.lo_last_name+'</a></div>' +
          '        <div class="info">' +
          '          <a id="footer-link-phone" class="phone" href="tel:'+loan_officer.lo_phone +'">'+phone_number+'</a>' +
          '          <a id="footer-link-mail" href="mailto:'+loan_officer.lo_email+'"><img src="/wp-content/themes/ms-theme/assets/images/follow-me-footer/envelope.png" /></a>' +
          '        </div>' +
          '       </div>' +
          '       <div class="follow-me-col-role">' +
          '       	<p class="role">' + role + '</p>' +
          '       	<p class="nmls">NMLS #' + loan_officer.lo_NMLS + '</p>' +
          '       </div>' +
          '      </div>' +
          '    </div>' +
          '  </div>' +
          '</div>'
        ;
    
        $('#content').addClass('relative');
        $('#content').append(myvar);
        $('#follow-me-footer').show();
      }

      if (!loan_officer || !loan_officer.teid) {
        $(".fb-lo-te-id > div.ginput_container_text > input").val(te_email_default);
        $(".fb-lo-te-id-download > div.ginput_container_text > input").val(te_email_default);
      } else {
        $(".fb-lo-te-id > div.ginput_container_text > input").val(loan_officer.teid);
        $(".fb-lo-te-id-download > div.ginput_container_text > input").val(loan_officer.teid);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) { },
    complete: function() {
      if ($("#gform_submit_button_3").length > 0) {
        $("#gform_submit_button_3").prop("disabled", false);
      }
      if ($("#gform_submit_button_10").length > 0) {
        $("#gform_submit_button_10").prop("disabled", false);
      }
      if ($("#gform_submit_button_1403").length > 0) {
        $("#gform_submit_button_1403").prop("disabled", false);
      }
      if ($("#ms-page-loading").length > 0) {
        $("#ms-page-loading").hide();
      }
    },
  });
});