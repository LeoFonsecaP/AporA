import { Activator } from '../js/Utils';

const fakeTrigger = document.createElement("button");
const FakeEventType = "click";
const activator = new Activator(fakeTrigger, FakeEventType);

test("Test if the activator is not running before the start method is called", () => {
    const fakeAction = jest.fn(() => {});

    activator.setAction(fakeAction);
    fakeTrigger.click();

    expect(fakeAction).not.toBeCalled();
});

test("Test if the activator class triggers an action when the selected event happens", () =>{
    const fakeAction = jest.fn(() => {});

    activator.setAction(fakeAction);
    activator.start();
    fakeTrigger.click();

    expect(fakeAction).toBeCalled();
});

test("Test if the activator class triggers the right action", () =>{
    const fakeOutputContainer = document.createElement("p");
    const string = "testing activator.";
    const fakeAction = (() => {
        fakeOutputContainer.textContent = string;
    }).bind(string, fakeOutputContainer);

    activator.setAction(fakeAction);
    activator.start();
    fakeTrigger.click();

    expect(fakeOutputContainer.textContent).toBe(string);
});

test("Test if an activator is properly interrupted after it has been started", () => {
    const fakeAction = jest.fn(() => {});

    activator.setAction(fakeAction);
    activator.start();
    activator.interrupt();
    fakeTrigger.click();

    expect(fakeAction).not.toBeCalled();
});

test("Test if an activators action can be properly overwritten while still running", () => {
    const firstFakeAction = jest.fn(() => {});
    const secondFakeAction = jest.fn(() => {});

    activator.setAction(firstFakeAction);
    activator.start();
    fakeTrigger.click();
    activator.setAction(secondFakeAction);
    fakeTrigger.click();
    expect(firstFakeAction).toBeCalledTimes(1);
    expect(secondFakeAction).toBeCalled();
})
