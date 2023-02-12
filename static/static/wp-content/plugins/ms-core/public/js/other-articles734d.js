jQuery(window).on("elementor/frontend/init", function () {
  var $ = jQuery;

  function initOtherArticles(id) {
    var iconNextLight = $(id).data("icon-next-light");
    var iconNextDark = $(id).data("icon-next-dark");
    var dataAdminUrl = $(id).data("admin-url");
    var settings = $(id).data("settings");
    var args = $(id).data("args");
    var totalPage = $(id).find(".ot-total-page").val();
    var settings = lodash.pick(settings, [
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

    function reRenderPagination(page, total) {
      page = parseInt(page) || 0;
      total = parseInt(total) || 0;
      var html = '';
      var active = "";
      if (page >= 3 && page < total && total > 5) {
        let activePrev = (1 == page) ? "" : "active";
        let isDarkPrev = (1 !== page) ? "dark" : "light";
        html += `<div id="fb_prev" class="pagination-prev prev ${activePrev}">`;
        html += `<img src="/wp-content/plugins/ms-core/public/images/angle-left-solid.svg" class="${isDarkPrev}"  width="15" height="24" alt="Arrow Angle Left">`;
        html += '<div></div>';
        html += '</div>';

        html += '<div class="page-index page-index-1" data-index="1">1</div>';
        html += '<div class="disable pt-10px">...</div>';
        if (page == total - 1) {
          var prePage = page - 1;
          html += `<div class="page-index page-index-${prePage}" data-index="${prePage}">${prePage}</div>`;
        }
        let currentNextPage = page;
        if (page != total - 1) {
          html += `<div class="page-index page-index-${page-1}" data-index="${page-1}">${page-1}</div>`;
          currentNextPage = page+1;
        }
        html += `<div class="page-index page-index-${page} active" data-index="${page}">${page}</div>`;
        if (page + 1 == total - 1) {
          var nextPage = page + 1;
          html += `<div class="page-index page-index-${nextPage} ${active}" data-index="${nextPage}">${nextPage}</div>`;
        } else if (page != total - 1) {
          html += `<div class="page-index page-index-${currentNextPage}" data-index="${currentNextPage}">${currentNextPage}</div>`;
          html += '<div class="disable pt-10px">...</div>';
        }
        if (page == total - 2) {
          html += '<div class="disable pt-10px">...</div>';
        }
        html += `<div class="page-index page-index-${total} ${active}" data-index="${total}">${total}</div>`;
        active = total == page ? "" : "active";
        var isDark = total == page ? "dark" : "light";
        html += '<div class="next ' + active + '">';
        html += '<div></div>';
        html += '<img src="/wp-content/plugins/ms-core/public/images/angle-right-solid.svg" class="icon-next '+ isDark +'"  width="15" height="24" alt="Arrow Angle Right">';
        html += '</div>';
      } else if(page == total && total > 5) {
        html += `<div id="fb_prev" class="pagination-prev prev active">`;
        html += `<img src="/wp-content/plugins/ms-core/public/images/angle-left-solid.svg" class="light" width="15" height="24" alt="Arrow Angle Right">`;
        html += '<div></div>';
        html += '</div>';
        let currentLast1 = total - 1;
        let currentLast2 = total - 2;
        html += '<div class="page-index page-index-1" data-index="1">1</div>';
        html += '<div class="disable pt-10px">...</div>';
        html += `<div class="page-index page-index-${currentLast2}" data-index="${currentLast2}">${currentLast2}</div>`;
        html += `<div class="page-index page-index-${currentLast1}" data-index="${currentLast1}">${currentLast1}</div>`;
        html += `<div class="page-index page-index-${total} active" data-index="${total}">${total}</div>`;
        html += '<div class="pagination-next next disable">';
        html += '<div class="custom-dark"></div>';
        html += '<img src="/wp-content/plugins/ms-core/public/images/angle-right-solid.svg" class="icon-next custom-dark"  width="15" height="24" alt="Arrow Angle Right">';
        html += '</div>';
      }else {
        if(total > 1){
          let activePrev = (1 == page) ? "disable" : "active";
          let isDarkPrev = (1 == page) ? "dark custom-dark" : "light";
          let customDark = (1 == page) ? "custom-dark" : "";
          html += `<div id="fb_prev" class="pagination-prev prev ${activePrev}">`;
          html += `<img src="/wp-content/plugins/ms-core/public/images/angle-left-solid.svg" class="${isDarkPrev}"  width="15" height="24" alt="Arrow Angle Right">`;
          html += `<div class=" ${customDark}"></div>`;
          html += '</div>';
        }
        var max = total > 3 ? 3 : total;
        for (i = 1; i <= max; i++) {
          active = i == page ? "active" : "";
          html += `<div class="page-index page-index-${i} ${active}" data-index="${i}">${i}</div>`;
        }
        if (total >= 6) {
          active = total == page ? "active" : "";
          html += '<div class="disable pt-10px">...</div>';
          html += `<div class="page-index page-index-${total} ${active}" data-index="${total}">${total}</div>`;
        } else if (total > 3) {
          for (i = 4; i <= total; i++) {
            var active = i == page ? "active" : "";
            html += `<div class="page-index page-index-${i} ${active}" data-index="${i}">${i}</div>`;
          }
        }
        active = total == page ? "" : "active";
        var isDark = total == page ? "dark custom-dark" : "light pagination-next";
        var isCustomDark = total == page ? "custom-dark" : "";
        html += '<div class="pagination-next next ' + active + '">';
        html += `<div class="${isCustomDark}"></div>`;
        html += '<img src="/wp-content/plugins/ms-core/public/images/angle-right-solid.svg" class="icon-next ' + isDark + '"  width="15" height="24" alt="Arrow Angle Right">';
        html += '</div>';
      }
      $(id).find(".pagination").html(html);
      $(id).find(".next").unbind("click");
      $(id).find(".page-index").unbind("click");
      $(id).find(".prev").unbind("click");
      $(id).find(".next").click(handleShowMore("next"));
      $(id).find(".prev").click(handleShowMore("prev"));
      $(id).find(".page-index").click(handleShowMore("page-index"));
    }

    function handleShowMore(type,token) {
      return function () {
        if (type == "next" && !$(id).find(".next").hasClass("active")) return;
        if (type == "prev" && !$(id).find(".prev").hasClass("active")) return;

        var paged = 1;
        var currentPage = parseInt($('.ot-paged').val()) || 1;
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let tokenUrl = urlParams.get('token')||'';
        if(currentPage == 1){
          if(tokenUrl){
            currentPage = JSON.parse(atob(tokenUrl)).current_page || 1;
            $('.ot-paged').val(currentPage);
          }
        }
        if (type == "page-index") {
          paged = parseInt($(this).data("index")) || 1;
          paged -= 1;
        } else {
          paged = parseInt($('.ot-paged').val()) || 1;
        }
        if(type == "prev"){
          paged = paged-2;
        }
        let showMorePage = 0;
        let tokenComeback = '';
        if (type == "more") {
          tokenComeback =  $('#token_come_back').val() || '';
          if (document.getElementById("show_more_button_text")) {
            document.getElementById("show_more_button_text").style.display = "none";
          }
          if (document.getElementById("show_more_button_icon")) {
            document.getElementById("show_more_button_icon").style.display = "block";
          }
          showMorePage = paged;
          if(tokenUrl){
            showMorePage = JSON.parse(atob(tokenUrl)).show_more_page || 1;
          }
        }

        let isSearchForm = 0;
        if (type == "token") {
          isSearchForm = 1;
        }
        var ajaxData = {
          action: "other_articles",
          paged: paged + 1,
          settings: settings,
          args: args,
          token_come_back: tokenComeback,
          is_search_form: isSearchForm,
        };

        if (type == "token") {
          ajaxData.token = token
        }

        $.ajax({
          type: "post",
          dataType: "json",
          url: dataAdminUrl,
          data: ajaxData,
          context: this,
          beforeSend: function () {},
          success: function (response) {
            if (type == "more") {
              if (document.getElementById("show_more_button_text")) {
                document.getElementById("show_more_button_text").style.display = "block";
              }
              if (document.getElementById("show_more_button_icon")) {
                document.getElementById("show_more_button_icon").style.display = "none";
              }
            }
            let limit = settings['posts_per_page']|| 12;
            let hideShowMore = 0;
            let totalPageResult = 0;

            total = lodash.get(response, "data.total") || 1;
            results = lodash.get(response, "data.results") || "";
            totalPageResult = lodash.get(response, "data.total_page") || totalPage;

            $('#token_come_back').val(lodash.get(response, "data.token_come_back") || "");
            let tokenComeBack =  $('#token_come_back').val();
            var nextPage = 0;
            if (type == "more") {
              $(".other-articles-container").append(results);
              nextPage = currentPage + 1;
            } else {
              $(".other-articles-container").html(results);
              nextPage = paged + 1;
            }
            if(nextPage > totalPageResult) {
              nextPage = totalPageResult;
            }
            reRenderPagination(nextPage, totalPageResult);
            postPerPage = settings['posts_per_page'];
            $('.ot-paged').val(paged + 1);
            if ((paged + 1) * postPerPage >= total) {
              hideShowMore = 1;
              $(id).find(".show-more-link").hide();
              $(".next").removeClass("active").addClass("disable");
              $(".next").find(".icon-next").removeClass("light").addClass('dark pagination-next');
            } else {
              hideShowMore = 0;
              $(id).find(".show-more-link").show();
              $(".next").addClass("active pagination-next").removeClass("disable");
              $(".next").find(".icon-next").removeClass("dark").addClass('light pagination-next');
            }
            if(type == "token") {
              let search_key = lodash.get(response, "data.search_key") || "";
              let tag_id = lodash.get(response, "data.tag_id") || "";
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
            }else {
              var tokenGenerate = {
                search_key:'',
                tag_id:'',
                page:paged,
                limit:limit,
                hide_show_more:hideShowMore,
                total_page:totalPage,
                current_page:nextPage,
                show_more_page:showMorePage,
                token_come_back:tokenComeBack,
                is_search_form: isSearchForm,
              };
            }
            let tokenCallBack = window.btoa(JSON.stringify(tokenGenerate)) || '';
            sessionStorage.setItem("token", tokenCallBack);
            var paramURL = "?token="+tokenCallBack;
            window.history.pushState({path:paramURL},'',paramURL);
          },
          error: function (jqXHR, textStatus, errorThrown) {},
          complete: function () {}
        })
      }
    }

    $(id).find(".show-more-link").click(handleShowMore("more"));

    $(id).find(".next").click(handleShowMore("next"));

    $(id).find(".prev").click(handleShowMore("prev"));

    $(id).find(".page-index").click(handleShowMore("page-index"));

    $(document).on("custom/elementor/blog-search", function (e, token) {
      handleShowMore("token", token)();
      // history.replaceState({}, '', '?token=' + token);
    });
  }

  elementorFrontend.hooks.addAction("frontend/element_ready/eael-post-grid.other-articles", function ($scope) {
    var id = "#other-articles-container-" + $($scope).attr('data-id');
    initOtherArticles(id);
  });
});
