import {MovementMenu} from "../js/modules/MovementMenu";

const NEXT_BUTTON_ID = 'next';
const PREV_BUTTON_ID = 'previous';
var nextButton;
var previousButton;
var menu;

beforeEach(() => {
    nextButton = document.createElement('button');
    nextButton.id = NEXT_BUTTON_ID;
    previousButton = document.createElement('button');
    previousButton.id = PREV_BUTTON_ID;

    document.body.appendChild(nextButton);
    document.body.appendChild(previousButton);

    menu = new MovementMenu(NEXT_BUTTON_ID, PREV_BUTTON_ID);
})

afterEach(() => {
    document.body.removeChild(nextButton);
    document.body.removeChild(previousButton);
})

test('[MovementMenu] test if next selection triggers the listeners',
    () => {
    let mockListener = [];
    mockListener.push(jest.fn(() => {return 'next'}));
    mockListener.push(jest.fn(() => {return 'nextButton'}));

    menu.addOnNextListener(mockListener[0]);
    menu.addOnNextListener(mockListener[1]);
    menu.startListening();
    nextButton.click();
    expect(mockListener[0].mock.results[0].value).toBe('next');
    expect(mockListener[1].mock.results[0].value).toBe('nextButton');
})

test('[MovementMenu] test if previous selection triggers the listeners',
    () => {
    let mockListener = [];
    mockListener.push(jest.fn(() => {return 'previous'}));
    mockListener.push(jest.fn(() => {return 'previousButton'}));

    menu.addOnPreviousListener(mockListener[0]);
    menu.addOnPreviousListener(mockListener[1]);
    menu.startListening();
    previousButton.click();

    expect(mockListener[0].mock.results[0].value).toBe('previous');
    expect(mockListener[1].mock.results[0].value).toBe('previousButton');
})
