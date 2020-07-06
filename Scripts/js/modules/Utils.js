export function getIndexOfHtmlChild(parent, element) {
    for (let index = 0; index < parent.children.length; index++)
        if (parent.children[index] === element)
            return index;
    return -1;
}

export function addHtmlChild(parent, element, index) {
    if (index == parent.children.length - 1)
        parent.appendChild(element);
    else
        parent.insertBefore(element, parent.children[index]);
}

export function removeHtmlChild(parent, index) {
    let nodeAtTheIndex = parent.children[index];
    parent.removeChild(nodeAtTheIndex);
}
