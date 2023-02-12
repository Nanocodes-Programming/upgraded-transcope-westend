jQuery(window).on("elementor/frontend/init", function () {
  var $ = jQuery;
  function scrollToLOList() {
    var targetOffset = $("#fb_expert_list").offset().top;
    $('html, body').animate({ scrollTop: targetOffset - 50 }, 600);
  }
  function stopLoadingLO(id) {
    $(id).find(".input-name").prop('disabled', false);
    $(id).find(".btn-search").prop('disabled', false);
    $(id).find(".btn-search").removeClass('cursor-not-allowed');
    $(id).find(".icon-loading").addClass("hidden");
    $(id).find(".icon-next-mobile").removeClass("hidden");
    $(id).find(".text-btn-search").removeClass("hidden");
  }
  function autoComplete (inp,id) {
    var currentFocus;
    $('#find_local_expert_search_name').on('input', _.debounce(function(e) {
          var addDivTag, selectResult, valueInput = this.value;
          closeAllLists();
          if (!valueInput) { return false;}
          currentFocus = -1;
          addDivTag =  $('<div></div>').attr('id', this.id + "autocomplete-list").addClass("autocomplete-items");
          $(this).parent().append(addDivTag.get());

          var dataAdminUrl = data_url;
          let ajaxReq = 'ToCancelPrevReq'; //abort 2 request consecutive
          ajaxReq = $.ajax({
          type: "get",
          dataType: "json",
          url: dataAdminUrl,
          data: {
              action: "auto_complete_loan_officer_name",
              data: valueInput,
          },
          context: this,
          beforeSend: function () {
              if(ajaxReq !== 'ToCancelPrevReq' && ajaxReq.readyState < 2) { // abort 2 request consecutive
                  ajaxReq.abort();
              }
          },
          success: function (response) {
                 let arr = response.data.loan_officer_name_list || [];
                 for(let item in arr ){
                      selectResult = $('<div></div>');
                      selectResult.append(arr[item].substr(0, valueInput.length));
                      selectResult.append(arr[item].substr(valueInput.length));
                      selectResult.append("<input type='hidden' value='" + arr[item] + "'>");

                      selectResult.bind("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        $.ajax({
                          type: "get",
                          dataType: "json",
                          url: dataAdminUrl,
                          data: {
                            action: "link_redirect_loan_officer_page",
                            loan_officer_id: item
                          },
                          context: this,
                          beforeSend: function () { },
                          success: function (response) {
                              if(response.data.loan_officer_detail_link){
                                  var name = $("#find_local_expert_search_name").val() || '';

                                  var tokenGenerate = {lo_name:name,is_show_all:0};

                                  var paramURL = "?lo_token="+window.btoa(JSON.stringify(tokenGenerate));
                                  window.history.pushState({path:paramURL},'',paramURL);
                                  window.location.href = response.data.loan_officer_detail_link;
                              }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            $(id).find(".error-ajax").removeClass("hidden");
                          },
                          complete: function () {
                          }
                        });
                        closeAllLists();
                      });
                      addDivTag.append(selectResult);
                }
          },
          error: function (jqXHR, textStatus, errorThrown) {
                if(errorThrown === 'abort' || errorThrown === 'undefined') return;
                $(id).find(".error-ajax").removeClass("hidden");
          },
          complete: function () {
          }
        });
    },500));

    $('input').on("keyup", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
              if (x) x[currentFocus].click();
          }
      }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      $("#find_local_expert_search_name").removeClass("ui-autocomplete-loading");
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
  function initFindLocalExert(id, widgetId) {

    handleSearch = function () {
      $(id).find(".error-message").addClass("hidden");
      $(id).find(".input-name").prop('disabled', true);
      $(id).find(".input-address").prop('disabled', true);
      $(id).find(".btn-search").prop('disabled', true);
      $(id).find(".btn-search").addClass('cursor-not-allowed');
      $(id).find(".icon-loading").removeClass("hidden");
      $(id).find(".icon-next-mobile").addClass("hidden");
      $(id).find(".text-btn-search").addClass("hidden");
      $(id).find(".input-name").removeClass("border-error");
      $(id).find(".input-address").removeClass("border-error");
      $(id).find(".require-input").addClass("hidden");

      var name = $(id).find(".input-name").val();
      let tokenShowAll = document.getElementById("token_show_all").value || '';

      var dataAdminUrl = $(id).data("admin-url");

      var ajaxData = {
        action: "find_local_expert",
        name: name,
        token_show_all: tokenShowAll,
        offset: 0
      };

      $.ajax({
        type: "post",
        dataType: "json",
        url: dataAdminUrl,
        data: ajaxData,
        context: this,
        beforeSend: function () { },
        success: function (response) {
          var los = response.data.loan_officers;
          var data = {
            from: "find-a-local-expert",
            ajaxData: ajaxData,
            count: response.data.count || 0,
            loanOfficers: los,
            showNext: response.data.per_page || 0
          };
          document.getElementById("search_random").value = 'false';
          document.getElementById("lo-current-offset").value = response.data.per_page || 5;
          document.getElementById("token_show_all").value = response.data.token_get_all || '';

          $(document).trigger("custom/elementor/loan-officers.default", [data]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $(id).find(".error-ajax").removeClass("hidden");
        },
        complete: function () {
          scrollToLOList();
          stopLoadingLO(id);
        }
      })
    };

    $(document).keypress(function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13') {
          event.preventDefault();
          handleSearch();
          var inp_name = $("#find_local_expert_search_name").val() || '';
          var lo_token_search = {lo_name:inp_name,is_show_all:0};
          var param_lo_token = "?lo_token="+window.btoa(JSON.stringify(lo_token_search));
          window.history.pushState({path:param_lo_token},'',param_lo_token);
      }
    });
    $(id).find('.btn-search').click(handleSearch);
    let inp = document.getElementById('find_local_expert_search_name');
    autoComplete(inp,id);
  }

  elementorFrontend.hooks.addAction('frontend/element_ready/find-a-local-expert.default', function ($scope) {
    var id = "#find-local-expert-container-" + jQuery($scope).attr('data-id');
    initFindLocalExert(id, jQuery($scope).attr('data-id'));
  });

  $("#find_local_expert_search_button").click(function(){
      var name = document.getElementById("find_local_expert_search_name").value;
      var random = document.getElementById("search_random").value || "false";
      $("#token_show_all").val('');
      if(random !== 'true'){
          var tokenGenerate = {lo_name:name,is_show_all:0};
          var paramURL = "?lo_token="+window.btoa(JSON.stringify(tokenGenerate));
          window.history.pushState({path:paramURL},'',paramURL);
      }
  });
});
