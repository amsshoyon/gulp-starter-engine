/* ********************************** */
/* Custom Scripts */
/* ********************************** */
(function ($) {
    "use strict";

    /*==========================================================================
        :: All Essential Functions
    ==========================================================================*/
    function inputAnimate() {
        if ($('.form-control').length) {

            // Check if has value
            $('.form-control').each(function () {
                if ($(this).val()) {
                    $(this).parents(".form-group").addClass('focus');
                }
            })

            // Events
            $('.form-control').focus(function () {
                $(this).parents(".form-group").addClass('focus');
            });

            $('.form-label').on('click', function () {
                $(this).siblings(".form-control").focus();
            });

            $(".form-control").focusout(function () {
                if ($(this).val() == '' || $(this).val() == null) {
                    $(this).parents(".form-group").removeClass('focus');
                };
            });

            $(".form-control").on('change keyup paste', function (e) {
                // alert($(this).val());
                if ($(this).val()) {
                    $(this).parents(".form-group").addClass('focus');
                }
                // if ($(this).val() == '' || $(this).val() == null) {
                //     $(this).parents(".form-group").addClass('error');
                // } else {
                //     $(this).parents(".form-group").removeClass('error');
                //     $(this).parents(".form-group").addClass('focus');
                // }
            });
        }
    }

    function menuHide() {
        $('main').removeClass('overlay');
        $('.menu-toggler').removeClass('show');
        setTimeout(function () {
            $('.menu-toggler').removeClass('animate');
        }, 300);
        $('.site-header .main-menu').removeClass('show');
        $('body').css({
            'overflow-y': 'visible'
        })
    }

    function menuShow() {
        $('main').addClass('overlay');
        $('.menu-toggler').addClass('animate');
        setTimeout(function () {
            $('.menu-toggler').addClass('show');
        }, 400);
        $('.site-header .main-menu').addClass('show');
        $('body').css({
            'overflow-y': 'hidden'
        })
    }

    function menuToggler() {
        var btn = $('.menu-toggler');
        if (btn.length) {
            btn.on('click', function () {
                if (btn.hasClass('animate')) {
                    menuHide();
                } else {
                    menuShow();
                }

            })

            $(document).click(function(event) {
                if(
                    !$(event.target).is($(this).find('.menu-toggler')) &&
                    !$(event.target).is($(this).find('.menu-toggler *')) &&
                    !$(event.target).is($(this).find('.main-menu')) &&
                    !$(event.target).is($(this).find('.main-menu *'))
                ){
                    menuHide();
                }
            });
        }
    }

    function pageLoader() {
        if ($('.preloader').length) {
            $('.preloader').addClass('visible');
        }
    }

    function goTop() {
        $('#go-top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 900);
        });
    }

    function dropdown() {
        if($('[data-toggle="dropdown"]').length){
            var btn = $('[data-toggle="dropdown"]');
            btn.on('click', function(e){
                e.preventDefault();
                $(this).siblings('.dropdown-menu').toggleClass('show');
            })

            $(document).click(function(e) {
              $('.dropdown').not($('.dropdown').has($(e.target))).children('.dropdown-menu').removeClass('show');
            });
        }
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {
        menuToggler();
        inputAnimate();
        goTop();
        dropdown();
        
        // Call it to bottom
        pageLoader();

    });

    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).scroll(function () {
        if ($(window).scrollTop() < 500) {
            $('.back-to-top').removeClass('show');
        }
        else {
            $('.back-to-top').addClass('show');
        }
    });

    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        //
    });

})(window.jQuery);
