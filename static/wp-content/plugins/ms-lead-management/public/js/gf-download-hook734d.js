jQuery(document).ready(function ($) {
    $(document).on("gform_confirmation_loaded", function (e, form_id) {
      var adminUrl = $("body").data("admin-ajax");
      if (form_id == 2 || form_id == 1401) {
        $.ajax({
          type: "post",
          dataType: "json",
          url: adminUrl,
          data: {
            action: "gf_download_ajax",
            form_id: form_id
          },
          context: this,
          beforeSend: function () {},
          success: function (response) {
            var url = response.data.url;
            var name_file = response.data.name || 'download-our-guide.pdf';
            if (url) {
              var our_guide = document.createElement('a');
              our_guide.href = url;
              our_guide.download = name_file;
              our_guide.click();
              our_guide.remove();
            }
          },
          error: function (jqXHR, textStatus, errorThrown) { },
        });
        return false;
      }
  
    });
  });
