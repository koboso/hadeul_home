let displaySwiper = true;

const audio_a = new Audio('audio/Pop_B.wav');
const audio_b = new Audio('audio/Pop_C.wav');
const audio_c = new Audio('audio/Pop_D.wav');

audio_a.preload = 'auto';
audio_b.preload = 'auto';   
audio_c.preload = 'auto';

function preloadImages(imageArray) {
    imageArray.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
    });
}

function changeDPadImage(newImage) {
    const dPad = document.querySelector('#d_pad');
    const originalImage = 'img/d_pad.png';

    if (dPad) {
        dPad.style.backgroundImage = `url('${newImage}')`;

        setTimeout(() => {
            dPad.style.backgroundImage = `url('${originalImage}')`;
        }, 300);  
    }
}

function changeBtnImage(btnType) {
    const btn = document.querySelector(`#btn_${btnType}`);
    const originalImage = `img/btn_${btnType}_on.png`;
    const newImage = `img/btn_${btnType}_off.png`;

    if (btn) {
        btn.style.backgroundImage = `url('${newImage}')`;

        setTimeout(() => {
            btn.style.backgroundImage = `url('${originalImage}')`;

        }, 300);
    }
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || 'en';
    return lang;
}

function handleWheelEvent(e) {
    const textContainer = document.getElementById('text_container');
        if (!displaySwiper && textContainer && !textContainer.contains(e.target)) {
            textContainer.scrollTop += e.deltaY;
        e.preventDefault(); 
    }
}

window.addEventListener('wheel', handleWheelEvent);

window.addEventListener('load', function () {

    preloadImages([
        'img/d_pad_l.png',
        'img/d_pad_r.png',
        'img/d_pad_u.png',
        'img/d_pad_d.png',
        'img/btn_a_off.png',
        'img/btn_b_off.png',
    ]);

    function adjustBackgroundContainer() {
        const contentContainer = document.querySelector('.content-container');
        const backgroundContainer = document.querySelector('.background-container');

        let resolution = 0.5667; 

        if (!contentContainer || !backgroundContainer) return;

        const contentWidth = contentContainer.offsetWidth;
        const contentHeight = contentContainer.offsetHeight;

        const targetHeight = contentWidth / resolution;

        if (targetHeight <= contentHeight) {
            backgroundContainer.style.width = `${contentWidth}px`;
            backgroundContainer.style.height = `${targetHeight}px`;
            backgroundContainer.style.marginTop = `${(contentHeight - targetHeight) / 2}px`;
            backgroundContainer.style.marginBottom = `${(contentHeight - targetHeight) / 2}px`;
            backgroundContainer.style.marginLeft = `0`;
            backgroundContainer.style.marginRight = `0`;
        } else {
            const targetWidth = contentHeight * resolution;
            backgroundContainer.style.width = `${targetWidth}px`;
            backgroundContainer.style.height = `${contentHeight}px`;
            backgroundContainer.style.marginTop = `0`;
            backgroundContainer.style.marginBottom = `0`;
            backgroundContainer.style.marginLeft = `${(contentWidth - targetWidth) / 2}px`;
            backgroundContainer.style.marginRight = `${(contentWidth - targetWidth) / 2}px`;
        }

        document.querySelectorAll('.inner-div').forEach(function (innerDiv) {
            const originalTop = parseFloat(innerDiv.getAttribute('data-original-top'));
            const originalLeft = parseFloat(innerDiv.getAttribute('data-original-left'));

            const scaleMultiplier2 = backgroundContainer.offsetWidth / 614;
            const scaleMultiplier = backgroundContainer.offsetHeight / 1080;

            const adjustedTop = originalTop * scaleMultiplier;
            const adjustedLeft = originalLeft * scaleMultiplier2;

            innerDiv.style.transform = `scale(${scaleMultiplier2})`;
            innerDiv.style.top = `${adjustedTop}px`;
            innerDiv.style.left = `${adjustedLeft}px`;
        });
    }

    window.addEventListener('resize', adjustBackgroundContainer);
    adjustBackgroundContainer();
});