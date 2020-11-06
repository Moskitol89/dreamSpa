$(function () {
    $('.image-popup-no-margins').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        showCloseBtn: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: false,
        }
    });
    $(".gallery__item-links ul li:last-child a").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("clicked");
    });

    let reviewsSwiper = new Swiper(".reviews .swiper-container", {
        spaceBetween: 30,
        allowTouchMove: false,
        autoHeight: true,
       autoplay : {
        delay: 5000
       },
        fadeEffect: {
          crossFade: true
        },
        effect: 'fade',
        navigation: {
            nextEl: '.reviews .swiper-next',
            prevEl: '.reviews .swiper-prev',
            disabledClass: 'swiper-button-disabled'
        },
    });

    let expertsSwiper = new Swiper(".about__page-experts .swiper-container", {
        spaceBetween: 25,
        slidesPerView: 1,
        navigation: {
            nextEl: '.experts__slider-arrows .swiper-next',
            prevEl: '.experts__slider-arrows .swiper-prev',
            disabledClass: 'swiper-button-disabled'
        },
        breakpoints: {
            840: {
                slidesPerView: 2
            }
        }
    });

    $(".header__burger").click(function () {
        $(".menu").slideToggle();
    })
    $(".header .menu ul li a").click(function () {
        $(".menu").fadeToggle();
    });

    $(".process__tab").click(function (){
        $(this).addClass("active").siblings().removeClass("active");
        let index = $(".process__tab").index(this);
        $(".process__tab-item").eq(index).addClass("active")
            .siblings().removeClass("active");
    });

    $(".about__page-gift .gift__item").click(function () {
        $(".about__page-gift .gift__item").removeClass("active");
       $(this).addClass("active");
       $(".about__page-gift .gift__item .gift__hover-block").html("Выбрать карту");
       $(".about__page-gift .gift__item.active .gift__hover-block").html("Карта выбрана");
    });
});