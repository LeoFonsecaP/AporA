export class MovementMenu {
    constructor(nextButtonId, previousButtonId, swipeDetector) {
        this.nextButton = document.getElementById(nextButtonId);
        this.previousButton = document.getElementById(previousButtonId);
        this.swipeDetector = swipeDetector;
        this.onNext = () => {};
        this.onPrevious = () => {};
    }

    addOnNextListener(listener) {
        this.onNext = listener;
    }

    addOnPreviousListener(listener) {
        this.onPrevious = listener;
    }

    startListening() {
        const boundOnNext = this.onNext.bind(this);
        const boundOnPrevious = this.onPrevious.bind(this);
        this.nextButton.addEventListener('click', boundOnNext);
        this.previousButton.addEventListener('click', boundOnPrevious);
        this.swipeDetector.addOnSwipeLeftListener(boundOnNext);
        this.swipeDetector.addOnSwipeRightListener(boundOnPrevious);
        this.swipeDetector.startListening();
    }
}

