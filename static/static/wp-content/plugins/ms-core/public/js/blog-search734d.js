jQuery(window).on("elementor/frontend/init", (function () {
  var $ = jQuery;
  var widgetName = "fb-search-blog-article.default";
  var intBlogSearch = function (id, widgetId) {
    var blogLanding = $(id).data("blog-landing");
    var siteUrl = $(id).data("site-url");
    var preToken = $(id).data("token");
    var dataAdminUrl = $(id).data("admin-url");
    let settings = $('#setting_form_search').val() || "";
    let args = $('#args_form_search').val() || "";
    try {
      settings = JSON.parse(atob(settings)) || {};
    } catch(e) {
      settings = {};
    }
    settings = lodash.pick(settings, [
      "eael_show_image",
      "eael_image_size_customize_size",
      "image_size",
      "title_tag",
      "eael_show_image",
      "eael_show_post_terms",
      "eael_post_terms",
      "eael_post_terms_max_length",
      "eael_post_grid_hover_animation",
      "eael_post_grid_bg_hover_icon_new",
      "eael_show_title",
      "eael_show_meta",
      "eael_show_excerpt",
      "eael_title_length",
      "meta_position",
      "eael_show_read_more_button",
      "meta_position",
      "eael_show_author",
      "eael_show_date",
      "posts_per_page"
    ]);
    try {
      args = JSON.parse(atob(args)) || {};
    } catch(e) {
      args = {};
    }

    var pretokenStr = $.base64.decode(preToken);
    var preTokenObj = {};
    try {
      preTokenObj = JSON.parse(pretokenStr) || {};
    } catch (error) {}
    $(document).keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13') {
        searchBlog();
      }
    });
    $('#fb_icon_search_form').click(function(){
       searchBlog();
    });
    $('#btn_blog_input_search').click(function(){
      searchBlog();
    });
    $("button").click(function() {
        if(this.classList.contains('button-tag-custom')){
          let tag_click_id = this.id || -1;
          setValueTagInput(tag_click_id);
          searchBlog(tag_click_id);
        }
    });
    $( ".filter-blog-artiles-select " ).change(function() {
        let tag_click_id = $(this).children(":selected").attr("id") || -1;
        setValueTagInput(tag_click_id);
        searchBlog(tag_click_id);
    });
    const setValueTagInput = function (tag_click_id) {
      let tag_id = -1;
      if(tag_click_id){
        tag_id = tag_click_id;
      }
      $( ".blog_search_tag_input" ).val(tag_id);
    };

    const searchBlog = function(tag_click_id){
      var tag_id = $( ".blog_search_tag_input" ).val() || -1;
      if(tag_click_id){
        tag_id = tag_click_id;
      }
      if (tag_id == -1) {
        tag_id = "";
      }
      var search_key = $("#fb_input_search").val();
      if((tag_id==="")&&(search_key==="")){
        window.history.replaceState({},'articles','/articles/');
        sessionStorage.setItem("token",'');
        showHiddenBlogSearchAndLanding(0);
        $(document).trigger("custom/elementor/post-carousel");
      }else {
        let limit = settings['posts_per_page']|| 12;
        var tokenObj = {
          search_key: encodeURIComponent(search_key),
          tag_id: tag_id,
          limit: limit
        };
        var token = window.btoa(JSON.stringify(tokenObj));
        showResultSearch(token);
      }
    };

    const showResultSearch = function(token){
          let isSearchForm = 1;
          var ajaxData = {
            action: "other_articles",
            paged: 1,
            settings: settings,
            args: args,
            is_search_form: isSearchForm,
          };

          ajaxData.token = token;
          $.ajax({
            type: "post",
            dataType: "json",
            url: dataAdminUrl,
            data: ajaxData,
            context: this,
            beforeSend: function () {},
            success: function (response) {
              let limit = settings['posts_per_page']|| 12;
              total = lodash.get(response, "data.total") || 1;
              results = lodash.get(response, "data.results") || "";
              $(".blog-search-result-list .other-articles-container").html(results);
              showHiddenBlogSearchAndLanding(1);

              let search_key = lodash.get(response, "data.search_key") || "";
              let tag_id = lodash.get(response, "data.tag_id") || "";
              $('#token_come_back').val(lodash.get(response, "data.token_come_back") || "");
              let tokenComeBack =  $('#token_come_back').val();
                var tokenGenerate = {
                  search_key:encodeURIComponent(search_key),
                  tag_id:tag_id,
                  page:0,
                  limit:limit,
                  hide_show_more:1,
                  total_page:-1,
                  current_page:-1,
                  show_more_page:-1,
                  token_come_back:tokenComeBack,
                  is_search_form: isSearchForm,
                };

              let tokenCallBack = window.btoa(JSON.stringify(tokenGenerate)) || '';
              sessionStorage.setItem("token", tokenCallBack);
              var paramURL = "?token="+tokenCallBack;
              window.history.pushState({path:paramURL},'',paramURL);
            },
            error: function (jqXHR, textStatus, errorThrown) {},
            complete: function () {}
          })
      };

    $(id).find(".button-tag-custom").click(function() {
      $(id).find(".button-tag-custom").removeClass("active");
      $(this).addClass("active");
    });
  };

  elementorFrontend.hooks.addAction("frontend/element_ready/" + widgetName, function ($scope) {
    var id = "#blog-search-container-" + $($scope).attr('data-id');
    intBlogSearch(id, $($scope).attr('data-id'));
  });
  const showHiddenBlogSearchAndLanding = function(search = 0) {
    if (search !== 0) {
      $(".blog-orther-articles-list").addClass("blog-hidden-section").removeClass("blog-show-section");

      $(".blog-search-result-list").addClass("blog-show-section").removeClass("blog-hidden-section");
      $(".blog-featured-articles").addClass("blog-hidden-section").removeClass("blog-show-section");
      $(".blog-title-featured").addClass("blog-hidden-section").removeClass("blog-show-section");
    } else {
      $(".blog-search-result-list").removeClass("blog-show-section").addClass('blog-hidden-section');

      $(".blog-featured-articles").removeClass("blog-hidden-section").addClass('blog-show-section');
      //#region Reload JS for Featured Blogs
      if(jQuery(".reload-featured-js-emit").length > 0) {
        elementorFrontend.hooks.doAction('frontend/element_ready/eael-post-carousel.carousel-article', jQuery('.reload-featured-js'), jQuery);
        jQuery(".reload-featured-js-emit").removeClass("reload-featured-js-emit");
      }
      //#endregion Reload JS for Featured Blogs
      $(".blog-orther-articles-list").removeClass("blog-hidden-section").addClass('blog-show-section');
      $(".blog-title-featured").removeClass("blog-hidden-section").addClass("blog-show-section");
    }
  };

  $('.arrow-right').click(function () {
     $('#filter-scroll-x').animate({ scrollLeft: "+=350px" }, "slow");
     $('.arrow-right').addClass('opacity-30');
     $('.arrow-left').removeClass('opacity-30');
  });
  $('.arrow-left').click(function () {
    $('#filter-scroll-x').animate({ scrollLeft: "-=350px" }, "slow");
    $('.arrow-left').addClass('opacity-30');
    $('.arrow-right').removeClass('opacity-30');
  });
}));
const blogOpenTag = function (evt) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("nav-tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" blog-tag-active", "");
  }

  evt.currentTarget.className += " blog-tag-active";
};
