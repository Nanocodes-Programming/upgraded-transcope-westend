jQuery(document).on("custom/elementor/loan-officers.default", function (e, data) {
  var $ = jQuery;

  function startLoadingLO(id) {
    $(id).find(".icon-loading").removeClass("hidden-lo-btn");
    $(id).find(".text-btn-show-next").addClass("hidden-lo-btn");
    $(id).find(".lo-show-next").addClass('cursor-not-allowed');
    $(id).find(".lo-show-next").removeClass('bg-primary-300 hover:bg-cta-medium-dark-hover active:bg-primary-700');
  }

  function stopLoadingLO(id) {
    $(id).find(".icon-loading").addClass("hidden-lo-btn");
    $(id).find(".text-btn-show-next").removeClass("hidden-lo-btn");
    $(id).find(".lo-show-next").removeClass('cursor-not-allowed');
    $(id).find(".lo-show-next").addClass('bg-primary-300 hover:bg-primary-400 active:bg-primary-600');
  }
  function getWayPointLO(id) {
    var len = $("#fb_expert_list").children().length;
    var itemList = $("#fb_expert_list");
    if (len > 5) {
      var lastItem = itemList.children().get(len - 1 - 5);
      return lastItem;
    } else {
      var lastItem = itemList.children().get(0);
      return lastItem;
    }
  }

  function renderLOList(dataList, options) {
    var html = "";
    dataList.forEach(function (lo) {
      var permalink = lo.permalink || "#";
      var roleName = lodash.get(lo, "lo_role_name") || "";
      var phone_mask = lo.lo_phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      var lo_app_id = lo.lo_app_id || '';
      var applyNowLink = options.buttonBaseUrl + options.buttonLOUrlPath + lo_app_id;
      html += '<div class="flex flex-col md:flex-row rounded-20px shadow-lo-item mb-30px 2xl:mb-40px overflow-hidden">';
      html += ' <!-- image -->';
      html += ' <div class="flex-initial bg-white">';
      html += '   <img class="lo-avatar w-full" src="'+ lo.thumbnail+'" alt="'+lo.lo_first_name+' '+lo.lo_last_name+'">';
      html += ' </div>';
      html += ' <!-- info -->';
      html += ' <div class="bg-white flex-auto p-20px pb-0 md:p-30px xl:p-40px">';
      html += '   <!-- firstname lastname -->';
      html += '   <div class="text-20 md:text-24 xl:text-32 md:text-left font-sharp-unity text-dark-purple font-extrabold text-center lg:text-left mb-20px md:mb-0 xl:mb-30px md:w-300 2xl:w-auto text-overflow-ellipsis">';
      html += '     <h2>' + lo.lo_first_name + ' ' + lo.lo_last_name + '</h2>';
      html += '   </div>';
      html += '   <div class="md:flex">';
      html += '     <h3 class="text-14 font-sf-pro text-center text-dark-purple xl:hidden font-bold whitespace-nowrap mb-10px">' + roleName + '</h3>';
      html += '     <h4 class="md:ml-20px text-14 font-sf-pro text-center xl:hidden whitespace-nowrap mb-30px text-sf-pro">NMLS #' + lo.lo_NMLS + '</h4>';
      html += '   </div>';
      html += '   <!-- phone -->'
      html += '   <div class="text-14 xl:text-18 font-sf-pro mb-10px md:w-300 2xl:w-auto">'
      html += '   <a href="tel:' + lo.lo_phone + '" class="flex items-center">'
      html += '     <img class="contact-icon" src="/wp-content/themes/ms-theme/assets/images/mortgage-expert/phone.png" alt="">'
      html += '     <p class="ml-15px text-dark-purple text-overflow-ellipsis">' + phone_mask + '</p>'
      html += '   </a>'
      html += '   </div>'
      html += '   <!-- email -->'
      html += '   <div class="text-14 xl:text-18 font-sf-pro mb-30px xl:mb-0 md:w-300 2xl:w-auto">'
      html += '   <a href="mailto:' + lo.lo_email + '" class="flex items-center">'
      html += '     <img class="contact-icon" src="/wp-content/themes/ms-theme/assets/images/mortgage-expert/envelope.png" alt="">'
      html += '     <p class="ml-15px text-dark-purple text-overflow-ellipsis">' + lo.lo_email + '</p>'
      html += '   </a>'
      html += '   </div>'
      html += '   <div class="min-w-max justify-between hidden md:flex xl:hidden">'
      html += '     <a id="find-local-expert-loan-officer-block-btn-visit-page" class="w-6/12 text-16 font-sharp-unity text-dark-purple font-extrabold h-50  btn-secondary justify-center flex items-center" href="'+permalink+'">Visit Page</a>'
      html += '     <a id="find-local-expert-loan-officer-block-btn-apply-now" class="los-apply-now w-6/12 ml-30px text-16 font-sharp-unity text-white font-extrabold h-50 btn-primary justify-center flex items-center" href="'+applyNowLink+'">Apply Now</a>'
      html += '   </div>'
      html += '</div>'
      html += '<!-- nmls id -->';
      html += ' <div class="bg-white flex-initial xl:flex xl:justify-between xl:flex-col lg:text-right text-left xl:p-40px xl:pl-0">';
      html += '<div>'
      html += '   <h3 class="hidden xl:block text-lg font-bold text-primary whitespace-nowrap xl:text-22">' + roleName + '</h3>';
      html += '   <h4 class="hidden xl:block text-lg text-gray-600 whitespace-nowrap xl:text-18 text-sf-pro">NMLS #' + lo.lo_NMLS + '</h4>';
      html += '</div>'
      html += '   <div class="md:hidden xl:flex min-w-max justify-between flex flex-col xl:flex-row px-20px pb-20px xl:p-0">';
      html += '     <a id="find-local-expert-loan-officer-block-btn-visit-page" class="text-16 xl:text-24 font-sharp-unity text-dark-purple font-extrabold h-50 xl:h-60 xl:w-180 btn-secondary justify-center flex items-center" href="'+ permalink +'">Visit Page</a>';
      html += '     <a id="find-local-expert-loan-officer-block-btn-apply-now" class="los-apply-now text-16 xl:text-24 font-sharp-unity text-white font-extrabold h-50 xl:h-60 xl:w-180 xl:ml-20px btn-primary justify-center flex items-center mt-20px xl:mt-0" href="'+ applyNowLink +'">Apply Now</a>';
      html += '   </div>';
      html += '</div>';
      html += '</div>';
    });
    return html;
  }
  if ((data && lodash.includes(["fb-branch-details", "find-a-local-expert"], data.from))||(data==='reuse')||(data==='reuselazyloading') ){
    if((data==='reuse')||(data==='reuselazyloading')){
      var offset = parseInt($("#lo-current-offset").val()) || 0;
      var ajaxData = {
        action: "find_local_expert",
        offset: offset
      };
    }else {
      var ajaxData = data.ajaxData;
      var showNext = data.showNext;
      var countLo = data.count;
    }

    var classLoanOfficerList = ".fb-branch-lo-list";

    function scrollToLOList(id) {
      var targetOffset = $(id).find(".lo-title").offset().top;
      $('html, body').animate({ scrollTop: targetOffset - 50 }, 600);
    }

    function initLO(id, widgetId) {
      var dataAdminUrl = $(id).data("admin-url");

      var buttonBaseUrl = $(id).data("button-base-url");
      var buttonUrlPath = $(id).data("button-url-path");
      var buttonLOUrlPath = $(id).data("button-lo-url-path");

      var perPage = parseInt($(id).find(".lo-perpage").val()) || 0;
      var morePage = parseInt($(id).find(".lo-more-page").val()) || 0;

      var autoLazyLoading = $(id).find(".lo_way_point").val() == "true" ? true : false;
      var waypoint = null;
      if((autoLazyLoading)&&(data==='reuselazyloading')) {
        waypoint = new Waypoint({
          element: getWayPointLO(id),
          handler: function() {
            showMoreFindLO(true);
            waypoint.destroy();
          }
        });
      }
      function showMoreFindLO(isWayPoint){
        offset = parseInt($(id).find(".lo-current-offset").val()) || 0;
        perPage = parseInt($(id).find(".lo-perpage").val()) || 0;
        morePage =  parseInt($(id).find(".lo-more-page").val()) || 0;
        let showAlltoken = document.getElementById("token_show_all").value || '';
        //
        startLoadingLO(id);
        if(data!=='reuse'){
          ajaxData.offset += perPage;
        }else {
          ajaxData.offset = offset;
        }
        ajaxData.token_show_all = showAlltoken;
        ajaxData.comeback = 1;
        ajaxData.name = $("#find_local_expert_search_name").val() || "";
        ajaxData.token_show_all = showAlltoken;

        if (isWayPoint) {
          $("#waypoint-loading-lo").show();
        }else {
          $('.fb-lo-show-next').addClass('fb-lo-show-next-loading');
        }

        $.ajax({
          type: "post",
          dataType: "json",
          url: dataAdminUrl,
          data: ajaxData,
          context: this,
          beforeSend: function () { },
          success: function (response) {
            $('.fb-lo-show-next').removeClass('fb-lo-show-next-loading');
            // $(id).find(".lo-show-next").hide();
            var totalLOItems = parseInt(response.data.count || 0);
            if (totalLOItems <= offset + (perPage * 2) - morePage) {
              offset = totalLOItems;
            }
            var show_all_token = response.data.token_come_back || '';
            var tokenGenerate = {lo_name:ajaxData.name,is_show_all:1,show_all_token:show_all_token,'offset_comeback':offset};
            var paramURL = "?lo_token="+window.btoa(JSON.stringify(tokenGenerate));
            window.history.pushState({path:paramURL},'',paramURL);

            var los = response.data.loan_officers;
            var html = renderLOList(los, { buttonBaseUrl, buttonUrlPath, buttonLOUrlPath });

            $(id).find(classLoanOfficerList).append(html);
            $(".los-apply-now").unbind("click");
            $(".los-apply-now").click(pushGTMEvent("apply-now"));

            if (totalLOItems > offset + (perPage * 2) - morePage) {
              waypoint = new Waypoint({
                element: getWayPointLO(id),
                handler: function(direction) {
                  $(id).find(".lo-current-offset").val(offset + perPage);
                  showMoreFindLO(true);
                  waypoint.destroy();
                }
              });
            }else {
              $('.fb-lo-show-next').removeClass('fb-lo-show-next-loading');
              stopLoadingLO(id);
              $('.show-all-wrapper').hide();
            }
            return true;
          },
          error: function (jqXHR, textStatus, errorThrown,id) {
            $('.fb-lo-show-next').removeClass('fb-lo-show-next-loading');
            $(id).find(".fb-branch-error-message").show()
          },
          complete: function(id) {
            if (isWayPoint) {
              $("#waypoint-loading-lo").hide();
            } else {
              $('.fb-lo-show-next').removeClass('fb-lo-show-next-loading');
            }
            stopLoadingLO(id);
          }
        });
      }

      $(id).find(".lo-show-next").unbind("click");
      $(id).find(".lo-show-next").click(function () {
          showMoreFindLO(false);
      });

      if(data==='reuse'){
        $(id).find(".lo-show-next").show();
      }
      if((data!=='reuse')&&(data!=='reuselazyloading')){
        var los = data.loanOfficers;
        if (countLo == 0 && data.from == "find-a-local-expert") {
          $(id).find(classLoanOfficerList).html("<p class='text-center text-find-expert-not-found'>We could not find any expert matching your search. Please try again.</p>");
        } else {
          var html = renderLOList(los, { buttonBaseUrl, buttonUrlPath, buttonLOUrlPath });
          $(id).find(classLoanOfficerList).html(html);
        }
        if (parseInt(showNext) >= parseInt(countLo)) {
          $('.show-all-wrapper').hide();
        } else {
          $('.show-all-wrapper').show();
        }
      }
    }

    $("div[data-widget_type='loan-officers.default']").each(function (index) {
      var id = "#lo-container-" + jQuery(this).attr('data-id');
      initLO(id, jQuery(this).attr('data-id'));
    });
  }
});
