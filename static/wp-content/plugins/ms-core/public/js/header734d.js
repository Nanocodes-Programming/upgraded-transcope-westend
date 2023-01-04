jQuery(document).ready(function($){

    $('#nav-toggle,#close-nav,#nav-mobile li a').on('click',function(){
        $('.ms-mobile-full-screen,.ms-nav-mobile').show();
        $('.ms-nav-mobile').addClass('show-menu').removeClass('hide-menu');
    });

    $('#close-nav,.screen-residuals').on('click',function(){
        
        $('.ms-nav-mobile').removeClass('show-menu').addClass('hide-menu');

        setTimeout(function(){
            $('.ms-mobile-full-screen,.ms-nav-mobile').hide();
        },200);
    });

    $('#menu-mobile .has-child').on('click',function(e){
        e.stopPropagation();
        $('#menu-mobile .has-child .sub-menu-tablet-mobile').slideUp(200);
        $('.drop-down').css({
            "transform":"none",
            "transition":".25s"
        });
        if(!$(this).find('.sub-menu-tablet-mobile').hasClass('submenu-mb-active')){
            $(this).addClass('item-active').find('.sub-menu-tablet-mobile').addClass('submenu-mb-active').slideDown(200);
            $(this).find('.drop-down').css({
                "transform":"rotate(180deg)",
                "transition":".25s",
            });
            $(this).find('span.menu-text-level-1-dark-theme').addClass('gradient-text');
            $(this).find('button.btn-drop-down-menu-level-1').addClass('gradient-text');
            $(this).find('img.icon-normal').addClass('hidden');
            $(this).find('img.icon-gradient').removeClass('hidden');
        } else {
            $('#menu-mobile .has-child').removeClass('item-active').find('.sub-menu-tablet-mobile').removeClass('submenu-mb-active').slideUp(200);
            $('.drop-down').css({
                "transform":"none",
                "transition":".25s",
            });
            $(this).find('span.menu-text-level-1-dark-theme').removeClass('gradient-text');
            $(this).find('button.btn-drop-down-menu-level-1').removeClass('gradient-text');
            $(this).find('img.icon-gradient').addClass('hidden');
            $(this).find('img.icon-normal').removeClass('hidden');
        }

    });

    $('.main-menu > li > a').focusin(
        function(){
            $('.sub-menu').addClass('invisible')
            let sub_menu = $(this).parent().find('.sub-menu');

            if(sub_menu != undefined) {
                sub_menu.removeClass('invisible');
            }
        });


    $('.quicklyApplyBtn').focusin(function (){
        $('.sub-menu').addClass('invisible');
    });

    var top_header = localStorage.getItem("DONT_SHOW_TOP_HEADER");

    if (top_header == null){
        $('#top-header').slideDown();
    } 

    $('#close-top-header').on('click',function(){
        $('#top-header').slideUp();
        localStorage.setItem("DONT_SHOW_TOP_HEADER", true);
    });
});
