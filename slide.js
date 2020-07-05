import {DEFAULT_TRANSITION_EFFECT} from "./Scripts/js/Sliders.js";
import {CircularSlider} from "./Scripts/js/CircularSlider.js";
const slidesContainer = document.getElementById('slider');
const slider = new CircularSlider(slidesContainer, 'horizontal');
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton');
nextButton.addEventListener("click", (() => {
slider.transitionToNextSlide(DEFAULT_TRANSITION_EFFECT);
}).bind(slider));
previousButton.addEventListener("click", (() => {
console.log(DEFAULT_TRANSITION_EFFECT);
slider.transitionToPreviousSlide(DEFAULT_TRANSITION_EFFECT);
}).bind(slider));