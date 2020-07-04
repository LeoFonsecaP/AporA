import {ShadowFilter, Modal} from '../js/Modals';

class FakeShadowFiler {
    constructor() {
        this.fakeShadowFilterElement = document.createElement("div");
    }
    appendToBody() {
        document.body.appendChild(this.fakeShadowFilterElement);
    }
    removeFromBody() {
        document.body.removeChild(this.fakeShadowFilterElement);
    }
}

class fakeActivator {
    constructor() {
        this.action = () => {}
    }
    setAction(action)  {
        this.action = action
    }
    start() {}
    interrupt() {}
    activate() {
        this.action();
    }
}

var color;
var opacity;
var shadowOverlay;

var fakeShadowFilter;
var fakeContentText;
var fakeContent;

var fakeCssClass;

var overlayComponent;
var fakeDisplayActivator;
var fakeKillActivator;

beforeAll(() => {
    color = "rgb(61, 61, 204)";
    opacity = "0.3";
    shadowOverlay = new ShadowFilter(color, opacity);

    fakeShadowFilter = new FakeShadowFiler();
    fakeContentText = "testing overlay component";
    fakeContent = document.createElement("p");
    fakeContent.textContent = fakeContentText;

    fakeCssClass = "fakeCssClass";

    overlayComponent = new Modal([fakeContent], fakeCssClass, fakeShadowFilter);
    fakeDisplayActivator = new fakeActivator();
    fakeKillActivator = new fakeActivator();
});

test("Test if the shadow overlay gets the correct style attributes", () => {
    expect(shadowOverlay.shadow.style["backgroundColor"]).toBe(color);
    expect(shadowOverlay.shadow.style["opacity"]).toBe(opacity);
});

test("Test if the shadow overlay gets properly appended",  () => {
    shadowOverlay.appendToBody();
    expect(document.body.contains(shadowOverlay.shadow)).toBeTruthy();
});

test("Test if the shadow overlay get properly removed ", () => {
    shadowOverlay.appendToBody();
    shadowOverlay.removeFromBody();
    expect(document.body.contains(shadowOverlay.shadow)).toBeFalsy();
});

test("Test if overlay component has the proper css class", () => {
    expect(overlayComponent.container.className).toBe(fakeCssClass);
});

test("Test if the Modal gets attached to the body of the document", () => {
    overlayComponent.appendToBody();
    expect(document.body.contains(overlayComponent.container)).toBeTruthy();
    expect(document.body.contains(fakeShadowFilter.fakeShadowFilterElement)).toBeTruthy();
})

test("Test if the modal gets removed from the body of the document ", () => {
    overlayComponent.appendToBody();
    overlayComponent.removeFromBody();
    expect(document.body.contains(overlayComponent.container)).toBeFalsy();
    expect(document.body.contains(fakeShadowFilter.fakeShadowFilterElement)).toBeFalsy();
});
