$(function () {
    //сюда вписывается информация с ползунка с страницы shop.html
    let sideBarPrice = $(".side-bar__range-price")

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
        autoplay: {
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

    let expertsSwiper = new Swiper(".experts__slider", {
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
    if (document.querySelector(".gallery-block__items")) {
        let mixItUp = mixitup(".gallery-block__items");
    }
    $(".header__burger").click(function () {
        $(".menu").slideToggle();
    })
    if (window.innerWidth < 1200) {
        $(".header .menu ul li a").click(function () {
            $(".menu").fadeToggle();
        });
    }

    //свой генератор звездочек
    //берет цифру из дата атрибута data-stars-filled дивов с классом rate
    //эта цифра - кол-во заполненных звезд, функция дополняет пустыми звездами до 5
    //внутри дива с классом rate создается ul к которому цепляются li с фоновыми картинками звезд
    let rateDivArr = document.querySelectorAll(".rate");
    rateDivArr.forEach(function (rateDiv) {
        let filledStarsNumber = rateDiv.dataset.starsFilled;
        let liStarParentUl = document.createElement("ul");
        rateDiv.appendChild(liStarParentUl);
        for (let i = 0; i < filledStarsNumber; i++) {
            let liStar = document.createElement("li");
            liStar.classList.add("filled-star");
            liStar.style.backgroundImage = "url(img/star-full.svg)";
            liStarParentUl.appendChild(liStar);
        }
        for (; filledStarsNumber < 5; filledStarsNumber++) {
            let liStar = document.createElement("li");
            liStar.classList.add("empty-star");
            liStar.style.backgroundImage = "url(img/star-empty.svg)";
            liStarParentUl.appendChild(liStar);
        }
    });

    $(".js-range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 60,
        from: 15,
        to: 40,
        drag_interval: true,
        min_interval: null,
        max_interval: null,
        hide_min_max: true,
        hide_from_to: true,
        onChange: function (data) {
            console.log(sideBarPrice)
            sideBarPrice.text(`Price: $${data.from}.00 - $${data.to}.00`);
        },
    });

    setTimeout(function() {
        $(".shop-main__sorting-sort").styler();
    }, 100)

    $(".process__tab").click(function () {
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

    $(".blog__side-bar .side-bar__categories-item").click(function () {
        $(".blog__side-bar .side-bar__categories-item").removeClass("active");
        $(this).addClass("active");
    });
    $(".blog__side-bar .side-bar__tags-btn").click(function () {
        $(".blog__side-bar .side-bar__tags-btn").removeClass("active");
        $(this).addClass("active");
    });
    $(".gallery__block-buttons .gallery__block-button").click(function () {
        $(".gallery__block-buttons .gallery__block-button").removeClass("active");
        $(this).addClass("active");
    });
//для демонстрации клика по ссылкам категорий и тегов на странице blog.html, отключен переход по ссылке
    $(".side-bar__categories-item a , .side-bar__tags-btn").click((e) => {
        e.preventDefault();
    })
});