import {DotsMenu} from "../js/modules/DotsMenu.js";

const CONTAINER_ID = 'container'
var container;

beforeEach(() => {
    container = document.createElement('div');
    container.id = CONTAINER_ID;
    document.body.appendChild(container);
})

afterEach(() => {
    document.body.removeChild(container);
})

test('[DotsMenu] is empty after creation with an empty container', () => {
    let menu = new DotsMenu('container', '', '');
    expect(menu.isEmpty()).toBeTruthy();
    expect(menu.getNumberOfDots()).toBe(0);
})

test('[DotsMenu] has 3 dots after creation with an container that' +
    ' already has 3 dots', () => {
    for (let i = 0; i < 3; i++)
        container.appendChild(document.createElement('button'));
    let menu = new DotsMenu('container', '', '');
    expect(menu.getNumberOfDots()).toBe(3);
})

test('[DotsMenu] has 1 dot after pushing a dot to an empty menu', () => {
    let menu = new DotsMenu('container', '', '');
    menu.pushDot();
    expect(menu.getNumberOfDots()).toBe(1);
})

test('[DotsMenu] has 3 dots after pushing 3 dots to an empty menu', () => {
    let menu = new DotsMenu('container', '', '');
    for (let i = 0; i < 5; i++)
        menu.pushDot();
    expect(menu.getNumberOfDots()).toBe(5);
})

test('[DotsMenu] has 1 dot after popping a dot on a 2 dots menu', () => {
    for (let i = 0; i < 3; i++)
        container.appendChild(document.createElement('button'));
    let menu = new DotsMenu('container', '', '');
    menu.popDot();
    expect(menu.getNumberOfDots()).toBe(2);
})

test('[DotsMenu] has 10 dots after setting number of dots to 10 on ' +
    'a 2 dots menu', () => {
    for (let i = 0; i < 3; i++)
        container.appendChild(document.createElement('button'));
    let menu = new DotsMenu('container', '', '');
    menu.setNumberOfDots(10);
    expect(menu.getNumberOfDots()).toBe(10);
})

test('[DotsMenu] is empty after clearing ' + 'a 100 dots menu', () => {
    for (let i = 0; i < 100; i++)
        container.appendChild(document.createElement('button'));
    let menu = new DotsMenu('container', '', '');
    menu.clear();
    expect(menu.isEmpty()).toBeTruthy();
})

test('[DotsMenu] selected element is properly set', () => {
    for (let i = 0; i < 3; i++)
        container.appendChild(document.createElement('button'));
    let menu = new DotsMenu('container', '', 'selected');
    menu.setSelectedDot(1);
    for (let i = 0; i < menu.getNumberOfDots(); i++) {
        if (i === 1) {
            expect(container.children[i].className).toBe('selected');
        } else {
            expect(container.children[i].className).toBe('');
        }
    }
})

test('[DotsMenu] previous dot is the selected one when a selected dot is' +
    ' popped', () => {
    for (let i = 0; i < 5; i++)
        container.appendChild(document.createElement('button'));
    let menu = new DotsMenu('container', '', 'selected');
    menu.setSelectedDot(4);
    menu.popDot();
    for (let i = 0; i < menu.getNumberOfDots(); i++) {
        if (i === menu.getNumberOfDots() - 1) {
            expect(container.children[i].className).toBe('selected');
        } else {
            expect(container.children[i].className).toBe('');
        }
    }
})

test('[DotsMenu] testing addition of selection listeners', () => {
    let listeners = [];
    listeners.push(jest.fn((index) => {return index}));
    listeners.push(jest.fn((index) => {return '[' + index + ']'}));

    for (let i = 0; i < 5; i++)
        container.appendChild(document.createElement('button'));
    let menu = new DotsMenu('container', '', 'selected');

    menu.addOnSelectionListener(listeners[0]);
    menu.addOnSelectionListener(listeners[1]);
    menu.startListening();
    container.children[2].click();
    expect(listeners[0].mock.results[0].value).toBe(2);
    expect(listeners[1].mock.results[0].value).toBe('[2]');
})
