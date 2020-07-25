export class MovementMenu {
    constructor(htmlNextButton, htmlPreviousButton, swipeDetector) {
        this.htmlNextButton = htmlNextButton;
        this.htmlPreviousButton = htmlPreviousButton;
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

        this.htmlNextButton.addEventListener('click', boundOnNext);
        this.htmlPreviousButton.addEventListener('click', boundOnPrevious);

        this.swipeDetector.addOnSwipeLeftListener(boundOnNext);
        this.swipeDetector.addOnSwipeRightListener(boundOnPrevious);
        this.swipeDetector.startListening();
    }
}

