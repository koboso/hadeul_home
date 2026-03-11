let mySwiper;

function loadFileIntoContainer(filePath) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('text_container').innerHTML = xhr.responseText;
        } else {
            console.error('파일을 불러오는 데 실패했습니다.');
        }
    };

    xhr.onerror = function() {
        console.error('AJAX 요청 중 오류가 발생했습니다.');
    };

    xhr.send();
}

function hideSwiper() {
    document.getElementById('slide_container').style.display = 'none';
}

function activateSwiper() {
    if (!displaySwiper) {
        displaySwiper = true;
        document.getElementById('slide_container').style.display = 'block';

        return true;
    }

    return false;
}

window.addEventListener('load', function () {

    const verticalSwiper = new Swiper('.main-swiper-container', {
        direction: 'vertical',
        effect: 'fade',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: false,
        speed: 550,
        loop: true,
        on: {
                slideChangeTransitionStart: function () {
                    const noiseOverlay = document.querySelector('.noise-overlay');
                    noiseOverlay.style.opacity = '1';
                },
                slideChangeTransitionEnd: function () {
                    const noiseOverlay = document.querySelector('.noise-overlay');
                    noiseOverlay.style.opacity = '0';
                }
            }
    });

    const horizontalSwipers = document.querySelectorAll('.inner-swiper-container');

    horizontalSwipers.forEach((swiperContainer) => {
        new Swiper(swiperContainer, {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            mousewheel: false,
        });
    });

    document.getElementById('prev').addEventListener('click', function () {
        audio_b.play();
        changeDPadImage('img/d_pad_l.png');

        if ( activateSwiper() ) return;

        const activeSwiperContainer = document.querySelector('.main-swiper-container .swiper-slide-active .inner-swiper-container');
        const activeSwiperInstance = activeSwiperContainer.swiper;
        
        if (activeSwiperInstance) {
            activeSwiperInstance.slidePrev();
        }
    });
    
    document.getElementById('after').addEventListener('click', function () {
        audio_b.play();
        changeDPadImage('img/d_pad_r.png');

        if ( activateSwiper() ) return;

        const activeSwiperContainer = document.querySelector('.main-swiper-container .swiper-slide-active .inner-swiper-container');
        const activeSwiperInstance = activeSwiperContainer.swiper;
        
        if (activeSwiperInstance) {
            activeSwiperInstance.slideNext();
        }
    });

    document.getElementById('up').addEventListener('click', function () {
        audio_a.play();
        changeDPadImage('img/d_pad_u.png');

        if ( activateSwiper() ) return;

        verticalSwiper.slidePrev();
    });

    document.getElementById('down').addEventListener('click', function () {
        audio_a.play();
        changeDPadImage('img/d_pad_d.png');

        if ( activateSwiper() ) return;

        verticalSwiper.slideNext();
    });

    document.getElementById('btn_a').addEventListener('click', function() {
        audio_c.play();
        changeBtnImage('a');

        if ( activateSwiper() ) return;

        window.open('https://play.google.com/store/apps/dev?id=6277806003195371927&hl=ko://www.google.com', '_blank');
    });

    document.getElementById('btn_b').addEventListener('click', function() {
        audio_c.play();
        changeBtnImage('b');

        if ( activateSwiper() ) return;

        window.open('https://apps.apple.com/kr/developer/hadeul-soft-co-ltd/id1452994276', '_blank');
    });

    document.getElementById('btn_home').addEventListener('click', function() {
        audio_c.play();

        if ( activateSwiper() ) return;

        verticalSwiper.slideTo(0, 500); 

        verticalSwiper.on('slideChangeTransitionEnd', function() {
            if (verticalSwiper.activeIndex === 0) {
                const activeHorizontalSwiper = document.querySelector('.main-swiper-container .swiper-slide-active .inner-swiper-container').swiper;
                if (activeHorizontalSwiper) {
                    activeHorizontalSwiper.slideTo(0, 500);
                }
            }
        });
    });

    document.getElementById('btn_bo_m').addEventListener('click', function() {
        audio_c.play();
        displaySwiper = false;

        const lang = getQueryParams();

        if ( lang === 'ko' ) {
            loadFileIntoContainer('/my/market_privacy_ko.html');
        } else if ( lang === 'en' ) {
            loadFileIntoContainer('/my/market_privacy_en.html');
        }
        document.getElementById('slide_container').style.display = 'none';
    });

    document.getElementById('btn_bo_t').addEventListener('click', function() {
        audio_c.play();
        displaySwiper = false;

        const lang = getQueryParams();

        if ( lang === 'en' ) {
            loadFileIntoContainer('/my/terms_of_service_en.html');
        } else if ( lang === 'ko' ) {
            loadFileIntoContainer('/my/terms_of_service_ko.html');
        }
        document.getElementById('slide_container').style.display = 'none';
    });

});