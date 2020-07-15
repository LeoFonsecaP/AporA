export const RESIZE_BORDER_CSS_CLASS = '_ResizeBorder';
export const CLOSE_ICON_CSS_CLASS = '_CloseIcon';

const INITIAL_ALLOCATED_TIME = 1;
const INITIAL_ACTIVITY_DESCRIPTION = '';

export class ActivityDisplay {
    constructor(parent, cssClass, initialStartDate) {
        this.htmlElement = document.createElement('div');
        this.htmlElement.className = cssClass;
        this.htmlElement.style.position = 'absolute';
        this.description = createParagraph();
        this.htmlElement.appendChild(this.description);
        this.htmlElement.appendChild(createResizeBorder());
        this.htmlElement.appendChild(createDeleteIcon());

        this.updateStartDate(initialStartDate)
        this.updateAllocatedTime(INITIAL_ALLOCATED_TIME);
        this.updateActivityDescription(INITIAL_ACTIVITY_DESCRIPTION);

        parent.appendChild(this.htmlElement);
    }

    updateStartDate(newStartDate) {
        const topRelativeOffset = ((newStartDate.hour / 24) * 100) + '%';
        const leftRelativeOffset = ((newStartDate.day / 7) * 100) + '%';
        this.htmlElement.style.left = leftRelativeOffset;
        this.htmlElement.style.top = topRelativeOffset;
    }

    updateAllocatedTime(newAllocatedTime) {
        this.htmlElement.style.height = ((newAllocatedTime / 24) * 100) + '%';
    }

    updateActivityDescription(newActivityDescription) {
        this.description.textContent = newActivityDescription;
    }

    update(newStartDate, newAllocatedTime, newActivityDescription) {
        this.updateStartDate(newStartDate);
        this.updateAllocatedTime(newAllocatedTime);
        this.updateActivityDescription(newActivityDescription);
    }

    destroy() {
        this.htmlElement.parentNode.removeChild(this.htmlElement);
    }
}

function createParagraph() {
    let resizeBorder = document.createElement('p');
    resizeBorder.fontSize = '10px'
    resizeBorder.style.marginTop = '17px';
    resizeBorder.style.width = 'calc(100% - 30px)';
    resizeBorder.style.height = 'calc(100% - 34px)';
    resizeBorder.style.marginLeft = '15px';
    resizeBorder.style.marginRight = '15px';
    resizeBorder.style.bottom = '0px';
    resizeBorder.style.wordWrap = 'break-word';
    return resizeBorder;
}

function createResizeBorder() {
    let resizeBorder = document.createElement('div');
    resizeBorder.classList.add('_ResizeBorder');
    resizeBorder.style.height = '10px';
    resizeBorder.style.width = '100%';
    resizeBorder.style.bottom = '0';
    resizeBorder.style.cursor = 'ns-resize';
    resizeBorder.style.position = 'absolute';
    resizeBorder.style.background = '#057700';
    return resizeBorder;
}

function createDeleteIcon() {
    let resizeBorder = document.createElement('div');
    resizeBorder.className = '_CloseIcon';
    resizeBorder.style.height = '20px';
    resizeBorder.style.width = '20px';
    resizeBorder.style.lineHeight = '20px';
    resizeBorder.style.fontSize = '20px';
    resizeBorder.style.textAlign = 'center';
    resizeBorder.style.cursor = 'pointer';
    resizeBorder.style.position = 'absolute';
    resizeBorder.style.top = '7px';
    resizeBorder.style.right = '7px';
    resizeBorder.innerHTML = '&#10005';
    resizeBorder.style.background = 'transparent';
    return resizeBorder;

}