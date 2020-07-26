import { CircularSlideShow } from "./modules/slideshow/CircularSlideShow.js";

function main() {
    const htmlNextButton = document.getElementById('nextButton');
    const htmlPreviousButton = document.getElementById('previousButton');
    const htmlSlider = document.getElementById('slider');
    const htmlDotsContainer = document.getElementById('dots');

    const slideShow = new CircularSlideShow(
        htmlSlider, htmlNextButton,
        htmlPreviousButton, htmlDotsContainer,
        'dot', 'selected_dot'
    );
    slideShow.start();

    window.addEventListener('resize', () => {
        setTimeout(() => slideShow.refresh(), 100);
    });
}

window.onload = main;
