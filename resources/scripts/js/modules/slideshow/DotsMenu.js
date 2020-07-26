import {getIndexOfHtmlChild} from "../Utils.js";

export class DotsMenu {
    constructor(htmlContainer, dotsCssClass, selectedDotCssClass) {
        this.htmlContainer = htmlContainer;
        this.dotsCssClass = dotsCssClass;
        this.selectedDotCssClass = selectedDotCssClass;
        this.selectedDotIndex = (this.isEmpty()) ? -1 : 0;
        this.listeners = [];
    }

    getNumberOfDots() {
        return (this.htmlContainer.children.length);
    }

    setNumberOfDots(numberOfDots) {
        while(this.getNumberOfDots() < numberOfDots)
            this.pushDot();
        while(this.getNumberOfDots() > numberOfDots)
            this.popDot();
    }

    isEmpty() {
        return (this.getNumberOfDots() === 0);
    }

    pushDot() {
        let newDot = document.createElement('button');
        this.htmlContainer.appendChild(newDot);
        newDot.className = this.dotsCssClass;
        if (this.getNumberOfDots() > 1)
            return;
        newDot.className = this.selectedDotCssClass;
        this.selectedDotIndex = 0;
    }

    popDot() {
        if (this.isEmpty())
            return;
        let numberOfDots = this.getNumberOfDots();
        if (numberOfDots > 1)
            this.setSelectedDot(numberOfDots - 2);
        let lastChild = this.htmlContainer.children[numberOfDots - 1];
        this.htmlContainer.removeChild(lastChild);
    }

    clear() {
        while(!this.isEmpty())
            this.popDot();
    }

    setSelectedDot(index) {
        let oldSelectedDot = this.htmlContainer.children[this.selectedDotIndex];
        this.selectedDotIndex = index;
        oldSelectedDot.className = this.dotsCssClass;
        this.htmlContainer.children[index].className = this.selectedDotCssClass;
    }

    addOnSelectionListener(listener) {
        this.listeners.push(listener);
    }

    startListening() {
        this.htmlContainer.addEventListener('click', ((click) => {
            let index = getIndexOfHtmlChild(this.htmlContainer, click.target);
            if (index === -1)
                return;
            this.listeners.forEach((listener) => {listener(index)});
            this.setSelectedDot(index);
        }).bind(this));
    }
}
