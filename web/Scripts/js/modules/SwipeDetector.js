export class SwipeDetector {
    constructor(htmlElementId) {
        this.element = document.getElementById(htmlElementId);

        this.x = 0;
        this.y = 0;

        this.onSwipeLeft = () => {};
        this.onSwipeRight = () => {};
        this.onSwipeUp = () => {};
        this.onSwipeDown = () => {};
    }

    addOnSwipeLeftListener(listener) {
        this.onSwipeLeft = listener;
    }

    addOnSwipeRightListener(listener) {
        this.onSwipeRight = listener;
    }

    addOnSwipeUpListener(listener) {
        this.onSwipeUp = listener;
    }

    addOnSwipeDownListener(listener) {
        this.onSwipeDown = listener;
    }

    startListening() {
        startListeningToTouchMovements(this);
        startListeningToMouseMovements(this);
    }
}

function startListeningToTouchMovements(detector) {
    detector.element.addEventListener('touchmove', event => {
        event.preventDefault();
    });
    detector.element.addEventListener('touchstart', event => {
        detector.x = event.changedTouches[0].pageX;
        detector.y = event.changedTouches[0].pageY;
    });
    detector.element.addEventListener('touchend', event => {
        detector.x = event.changedTouches[0].pageX - detector.x;
        detector.y = event.changedTouches[0].pageY - detector.y;
        (selectListener(detector))();
    });
}

function startListeningToMouseMovements(detector) {
    detector.element.addEventListener('mousemove', event => {
        event.preventDefault();
    });
    detector.element.addEventListener('mousedown', event => {
        detector.x = event.clientX;
        detector.y = event.clientY;
    });
    detector.element.addEventListener('mouseup', event => {
        detector.x = event.clientX - detector.x;
        detector.y = event.clientY - detector.y;
        (selectListener(detector))();
    });
}

function selectListener(detector) {
    const horizontalListener = selectHorizontalListener(detector);
    const verticalListener = selectVerticalListener(detector);
    let selectHorizontal = Math.abs(detector.x) > Math.abs(detector.y);
    return selectHorizontal ? horizontalListener : verticalListener;
}

function selectHorizontalListener(detector) {
    return (detector.x < 0) ? detector.onSwipeLeft : detector.onSwipeRight;
}

function selectVerticalListener(detector) {
    return (detector.y < 0) ? detector.onSwipeUp : detector.onSwipeDown;
}