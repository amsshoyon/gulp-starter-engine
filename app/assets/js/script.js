/* ********************************** */
/* Custom Scripts */
/* ********************************** */
(function ($) {
    "use strict";

    /*==========================================================================
        :: All Essential Functions
    ==========================================================================*/
    function menuHide() {
        $('main').removeClass('overlay');
        $('.menu-toggler').removeClass('show');
        setTimeout(function () {
            $('.menu-toggler').removeClass('animate');
        }, 300);
        $('.site-header .menu-area').removeClass('show');
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
        $('.site-header .menu-area').addClass('show');
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
                    !$(event.target).is($(this).find('.menu-area')) &&
                    !$(event.target).is($(this).find('.menu-area *'))
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
            }, 0);
        });
    }

    function dropdown() {
        if($('[data-toggle="dropdown"]').length && $(window).width() < 768){
            var btn = $('[data-toggle="dropdown"]');
            btn.on('click', function(e){
                e.preventDefault();
                $(this).siblings('.dropdown-menus').slideToggle();
            })

            $(document).click(function(e) {
              $('.dropdown').not($('.dropdown').has($(e.target))).children('.dropdown-menus').removeClass('show');
            });
        }
    }

    function reviewSlider() {
        let slider = $('.review-slider');
        if (slider.length) {
            slider.slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 2,
                prevArrow:"<img class='slick-arrow slick-prev' src='assets/images/icons/arrow-left.svg'>",
                nextArrow:"<img class='slick-arrow slick-next' src='assets/images/icons/arrow-right.svg'>",
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    }
                ]
            });
        }
    }

    function productSlider() {
        if($('.product-images').length){
            $('.product-images').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.product-thumbs'
            });
            $('.product-thumbs').slick({
                slidesToShow: 4,
                slidesToScroll: 2,
                asNavFor: '.product-images',
                dots: false,
                arrows: false,
            });
        }
    }

    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {
        menuToggler();
        goTop();
        dropdown();
        reviewSlider();
        productSlider();
        
        // Call it to bottom
        pageLoader();

    });

    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).scroll(function () {
        if ($(window).scrollTop() < 150) {
            $('.back-to-top').removeClass('show');
            $('.site-header').removeClass('shadow');
        }
        else {
            $('.back-to-top').addClass('show');
            $('.site-header').addClass('shadow');
        }
    });

    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        //
    });

})(window.jQuery);