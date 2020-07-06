import {Slider, DEFAULT_TRANSITION} from "../js/modules/Slider.js";

const SLIDER_ID = 'slider'
var sliderHtml;
var slider;


beforeEach(() => {
    sliderHtml = document.createElement('div');
    sliderHtml.id = SLIDER_ID;
    document.body.appendChild(sliderHtml);
    slider = new Slider(SLIDER_ID, DEFAULT_TRANSITION);
})

afterEach(() => {
    document.body.removeChild(sliderHtml);
})

test('[Slider] testing if a slider has 1 slide after adding a slide ' +
    'to an empty slider', () => {
    let newItems = document.createElement('img');
    slider.addItem(0, newItems);
    expect(slider.getNumberOfItems()).toBe(1);
})

test('[Slider] testing if a slider has 100 slide after adding a slide ' +
    'to an empty slider', () => {
    const NUMBER_OF_SLIDES_TO_ADD = 100;
    let newItems = [];
    for (let i = 0; i < NUMBER_OF_SLIDES_TO_ADD; i++)
        newItems.push(document.createElement('img'));
    newItems.forEach((slide) => slider.addItem(0, slide));
    expect(slider.getNumberOfItems()).toBe(NUMBER_OF_SLIDES_TO_ADD);
})

test('[Slider] testing if a slide gets properly added to position 48 in' +
   ' an 100 slides slider', () => {
    const NUMBER_OF_SLIDES_IN_THE_SLIDER = 100;
    const POSITION_TO_ADD = 48;
    let addedItem = document.createElement('img');
    addedItem.id = 'slideAt48';
    for (let i = 0; i < NUMBER_OF_SLIDES_IN_THE_SLIDER; i++)
        sliderHtml.appendChild(document.createElement('img'));

    slider.addItem(POSITION_TO_ADD, addedItem);
    expect(slider.getItem(POSITION_TO_ADD).id).toBe(addedItem.id);
})

test('[Slider] testing if a slider is empty after removing a slide ' +
    'from a 1 slide slider', () => {
    let newItem = document.createElement('img');
    sliderHtml.appendChild(newItem);
    slider.removeItem(0);
    expect(slider.isEmpty()).toBeTruthy();
})

test('[Slider] testing if a slider has 80 slides after removing 20' +
    ' slides from a 100 slides slider', () => {
    const NUMBER_OF_SLIDES_IN_THE_SLIDER = 100;
    const NUMBER_OF_SLIDES_TO_REMOVE = 20;
    const EXPECTED_NUMBER_OF_SLIDES = 80;
    for (let i = 0; i < NUMBER_OF_SLIDES_IN_THE_SLIDER; i++)
        sliderHtml.appendChild(document.createElement('img'));
    for (let i = 0; i < NUMBER_OF_SLIDES_TO_REMOVE; i++) {
        slider.removeItem(0);
    }
    expect(slider.getNumberOfItems()).toBe(EXPECTED_NUMBER_OF_SLIDES);
})

test('[Slider] testing if removing from an empty slide does nothing', () => {
    slider.removeItem(0);
    expect(slider.getNumberOfItems()).toBe(0);
})

test('[Slider] testing if a slider is empty after clearing' +
    ' a 100 slides slider', () => {
    const NUMBER_OF_SLIDES_IN_THE_SLIDER = 100;
    for (let i = 0; i < NUMBER_OF_SLIDES_IN_THE_SLIDER; i++)
        sliderHtml.appendChild(document.createElement('img'));
    slider.clear();
    expect(slider.isEmpty()).toBeTruthy();
})

test('[Slider] testing if when the slider is empty it does not ' +
    'transition', () => {
    slider.transitionToNextItem();
    expect(slider.getIndexOfCurrentItem()).toBe(0);
    slider.transitionToPreviousItem();
    expect(slider.getIndexOfCurrentItem()).toBe(0);
    slider.transitionToItem(100);
    expect(slider.getIndexOfCurrentItem()).toBe(0);
});

test('[Slider] testing if when the slider is not empty it properly' +
    ' transitions to a slide', () => {
    const NUMBER_OF_SLIDES_IN_THE_SLIDER = 100;
    const TARGET_SLIDE = 47;
    for (let i = 0; i < NUMBER_OF_SLIDES_IN_THE_SLIDER; i++)
        sliderHtml.appendChild(document.createElement('img'));
    slider.transitionToItem(TARGET_SLIDE);
    expect(slider.getIndexOfCurrentItem()).toBe(TARGET_SLIDE);
})


test('[Slider] testing if when the slider is not empty it properly' +
    ' transitions to the next slide and stops at the end', () => {
    const NUMBER_OF_SLIDES_IN_THE_SLIDER = 100;
    for (let i = 0; i < NUMBER_OF_SLIDES_IN_THE_SLIDER; i++)
        sliderHtml.appendChild(document.createElement('img'));
    for (let i = 0; i < NUMBER_OF_SLIDES_IN_THE_SLIDER - 1; i++) {
        slider.transitionToNextItem();
        expect(slider.getIndexOfCurrentItem()).toBe(i + 1);
    }
    slider.transitionToNextItem();
    expect(slider.getIndexOfCurrentItem()).toBe(NUMBER_OF_SLIDES_IN_THE_SLIDER - 1);
})

test('[Slider] testing if when the slider is not empty it properly' +
    ' transitions to the previous slide and stops at the first one', () => {
    const NUMBER_OF_SLIDES_IN_THE_SLIDER = 100;
    for (let i = 0; i < NUMBER_OF_SLIDES_IN_THE_SLIDER; i++)
        sliderHtml.appendChild(document.createElement('img'));
    slider.transitionToItem(NUMBER_OF_SLIDES_IN_THE_SLIDER - 1);
    for (let i = NUMBER_OF_SLIDES_IN_THE_SLIDER - 1; i > 0; i--) {
        slider.transitionToPreviousItem();
        expect(slider.getIndexOfCurrentItem()).toBe(i - 1);
    }
    slider.transitionToPreviousItem();
    expect(slider.getIndexOfCurrentItem()).toBe(0);
})
