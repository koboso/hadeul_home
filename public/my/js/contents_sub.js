
let lang = getQueryParams() || 'en';
displaySwiper = false;

const SCROLL_AMOUNT = 120;

function goToMain() {
    window.location.href = '/my/contents.html?lang=' + lang;
}

function scrollTextUp() {
    const tc = document.getElementById('text_container');
    if (tc) tc.scrollTop -= SCROLL_AMOUNT;
}

function scrollTextDown() {
    const tc = document.getElementById('text_container');
    if (tc) tc.scrollTop += SCROLL_AMOUNT;
}

window.addEventListener('load', function () {

    document.getElementById('prev').addEventListener('click', function () {
        audio_b.play();
        changeDPadImage('img/d_pad_l.png');

        goToMain();
    });

    document.getElementById('after').addEventListener('click', function () {
        audio_b.play();
        changeDPadImage('img/d_pad_r.png');

        goToMain();
    });

    document.getElementById('up').addEventListener('click', function () {
        audio_a.play();
        changeDPadImage('img/d_pad_u.png');

        scrollTextUp();
    });

    document.getElementById('down').addEventListener('click', function () {
        audio_a.play();
        changeDPadImage('img/d_pad_d.png');

        scrollTextDown();
    });

    document.getElementById('btn_a').addEventListener('click', function() {
        audio_c.play();
        changeBtnImage('a');

        goToMain();
    });

    document.getElementById('btn_b').addEventListener('click', function() {
        audio_c.play();
        changeBtnImage('b');

        goToMain();
    });

    document.getElementById('btn_home').addEventListener('click', function() {
        audio_c.play();

        goToMain();
    });

    document.getElementById('btn_bo_m').addEventListener('click', function() {
        audio_c.play();
        displaySwiper = false;

        window.location.href = '/my/market_privacy.php?lang=' + lang;
    });

    document.getElementById('btn_bo_t').addEventListener('click', function() {
        audio_c.play();
        displaySwiper = false;

        window.location.href = '/my/terms_of_service.php?lang=' + lang;
    });

});
