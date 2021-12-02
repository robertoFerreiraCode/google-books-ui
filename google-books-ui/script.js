import {removeAllChildNodes, createEmptyMessage, createStyledElement} from "./dom-utils.js";
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

const REQUEST_URL = "https://www.googleapis.com/books/v1/volumes?q=";

// returns book array
const getBooks = async (search) => {
    const response = await fetch(`${REQUEST_URL}${search.split(" ").join("+")}`);
    const jsonResponse = await response.json();
    return jsonResponse.items;
}

const displayBooks = (books) => {
    const main = document.querySelector(".main");
    const list = document.querySelector(".results");
    const error  = document.querySelector(".alert");
    const append = parent => child => parent.appendChild(child);

    if (list.firstChild) {
        removeAllChildNodes(list);
    }
    if (error) {
        main.removeChild(error);
    }

    if (!books) {
        main.append(createEmptyMessage());
        return;
    }
    const bookList = books.map(book => {
        return createBookElement(book);
    });
    bookList.forEach(append(list));
}

const createBookElement = (book) => {
    const elementList = [];
    const titleText = book.volumeInfo.title;
    const authorText = book.volumeInfo?.authors ?? "No Authors";
    const imageUrl = book.volumeInfo.imageLinks?.thumbnail ?? "./assets/broken-img.png";
    const descriptionText = book.volumeInfo?.description ?? "";
    if (descriptionText === "undefined") descriptionText = "";

    const div = createStyledElement("div", "book");
    const textDiv = createStyledElement("div", "book__text-section");
    const imageDiv = createStyledElement("div", "book__image-section");
    div.appendChild(textDiv);
    div.appendChild(imageDiv);

    const image = document.createElement("img");
    image.classList.add("book__img");
    image.src = imageUrl;
    imageDiv.appendChild(image);

    elementList.push(createStyledElement("p", "book__title", `${titleText}`));
    elementList.push(createStyledElement("p", "book__author", `Author: ${authorText}`));
    elementList.push(createStyledElement("p", "book__description", `${descriptionText}`));
    elementList.forEach(element => textDiv.appendChild(element));
    return div;
}

searchBtn.addEventListener("click", async () => {
    displayBooks(await getBooks(searchInput.value));
})