const preloader = (function () {
    let percentTotal = 0,
        preloader = document.querySelector('#preloader');

    let imgPath = [];
    [...(document.querySelectorAll('*'))].forEach((element, index) => {
        let bg = element.style.backgroundImage; // url('/images/1.png')
        let isImg = element.tagName === 'IMG'; // true/false
        let path;

        if (bg) {
            path = bg
                    .replace('url("', '')// /images/1.png')
                    .replace('")', '');// /images/1.png
        }

        if (isImg) {
            path = element.getAttribute('src'); // /images/1.png
        }

        path && imgPath.push(path);
    });

    // imgPath = ["/images/sdfsdf.png", "/images/2.png"]

    const setPercent = (total, current) => {
        let percents = Math.ceil(current / total * 100);

        document.querySelector('#preloader__percent').innerText = percents + '%';

        if (percents >= 100) {
            // preloader.style.display = 'none';
        }
    }

    let loadImages = (images) => {
        if (!images.length) {
            // preloader.style.display = 'none';
        }
        else {
            images.forEach((img) => {
                let fakeImg = document.createElement('img');
                fakeImg.setAttribute('src', img);

                fakeImg.onload = fakeImg.error = () => {
                    percentTotal++;
                    setPercent(images.length, percentTotal);
                }
            });
        }
    }

    return {
        init() {
            loadImages(imgPath);
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    preloader.init();
});
