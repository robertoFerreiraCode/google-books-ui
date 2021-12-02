export const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export const createEmptyMessage = () => {
    const div = createStyledElement("div", "alert");
    div.classList.add("alert-danger");
    div.innerText = "No books to display...";
    div.role="alert"
    return div;
}

export const createStyledElement = (element, className, text="") => {
    const newElement = document.createElement(element);
    newElement.classList.add(className);
    newElement.innerText = text;
    return newElement;
}