jQuery(window).on("elementor/frontend/init", (function () {
  var $ = jQuery;
  var thirdPartyReview = "third-party-review.default";
  var init3rdPartyReview = function (id, widgetId) {
    var count = $(id).data("review-count");

    if (count > 0) {
      var SwiperObj = Swiper ? Swiper : elementorFrontend.utils.swiper;
  
      new SwiperObj(".swiper-container-" + widgetId, {
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 2.38,
            spaceBetween: 0,
            centeredSlides: true
          },
          600: {
            slidesPerView: 1.6,
            spaceBetween: 0,
            centeredSlides: true
          },
          470: {
            slidesPerView: 1.4,
            spaceBetween: 0,
            centeredSlides: true
          },
          320: {
            slidesPerView: 1.22,
            spaceBetween: 0,
            centeredSlides: true
          }
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: $(id).find(".swiper-button-next"),
          prevEl: $(id).find(".swiper-button-prev"),
        },
        loop: true,
      });
  
      $( ".swiper-content-review" ).each(function() {
        $clamp($(this).get(0), { clamp: 'auto' });
      });
    } else {
      $(".swiper-button-prev").hide();
      $(".swiper-button-next").hide();
    }
    
    $('.show-full-review').unbind("click");
    $('.show-full-review').on('click',function (){
      var name = $(this).data("name");
      var address = $(this).data("address");
      var created_at = $(this).data("created_at");
      var review = $(this).data("review");
      var title = $(this).data("title");
  
      $('#swiper-modal .swiper-content-name').text(name);
      $('#swiper-modal .swiper-content-address').text(address);
      $('#swiper-modal .swiper-content-date').text(created_at);
      $('#swiper-modal .swiper-content-review').text(review);
      $('#swiper-modal .swiper-content-title').text(title);
      $('#swiper-modal .swiper-content-star').html($(this).find('.swiper-content-star').html());
  
      $('body').addClass('overflow-hidden');
      $('#swiper-modal').fadeIn();
    });
  }

  elementorFrontend.hooks.addAction("frontend/element_ready/" + thirdPartyReview, function ($scope) {
    var id = ".third-party-review-container-" + $($scope).attr('data-id');
    init3rdPartyReview(id, $($scope).attr('data-id'));
  });

  var html =  '<div id="swiper-modal">';
      html += '<div class="third-party-review-swiper-container">';
      html +=        '<div class="swiper-slide">';
      html +=            '<div class="swiper-content shadow-lg">';
      html +=                '<img id="close-swiper-modal" src="http://127.0.0.1:9000/static/wp-content/themes/ms-theme/assets/images/popup-close.png">';
      html +=                '<div class="swiper-content-header">';
      html +=                    '<div class="swiper-content-left">';
      html +=                        '<div class="swiper-content-name">';
      html +=                        '</div>';
      html +=                        '<div class="swiper-content-star">';
      html +=                        '</div>';
      html +=                    '</div>';
      html +=                    '<div class="swiper-content-right">';
      html +=                       '<div class="swiper-content-date">';
      html +=                       '</div>';
      html +=                       '<div class="swiper-content-address">';
      html +=                       '</div>';
      html +=                    '</div>';
      html +=               '</div>';
      html +=                '<div class="swiper-content-title">';
      html +=                '</div>';
      html +=                '<div class="swiper-content-review" title="">';
      html +=                '</div>';
      html +=            '</div>';
      html +=        '</div>';
      html +=    '</div>';
      html +=  '</div>';

  $('body').append(html);

  $('#close-swiper-modal').click(function(e){
    close_modal(e);
  });

  $(document).click(function (e)
  {
      var container = $(".swiper-content");
      if (!container.is(e.target) && container.has(e.target).length === 0)
      {
        close_modal(e);
      }
  });


  function close_modal(e){
    e.stopPropagation();
    $('body').removeClass('overflow-hidden');
    $('#swiper-modal').fadeOut();
  }

}))