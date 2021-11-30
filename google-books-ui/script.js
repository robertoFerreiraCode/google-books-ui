const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

const REQUEST_URL = "https://www.googleapis.com/books/v1/volumes?q=";

// returns book array
const getBooks = async (search) => {
    const response = await fetch(`${REQUEST_URL}${search.split(" ").join("+")}`);
    const jsonResponse = await response.json();
    // console.log(jsonResponse.items.volumeInfo);
    return jsonResponse.items;
}

const displayBooks = (books) => {
    console.log(books);
    const bookList = books.map(book => {
        return createBookElement(book);
    });
    const list = document.querySelector(".results");
    const append = parent => child => parent.appendChild(child);

    bookList.forEach(append(list));

}

const createBookElement = (book) => {
    const elementList = [];
    const titleText = book.volumeInfo.title;
    const authorText = book.volumeInfo.authors.join(", ");
    const imageUrl = book.volumeInfo.imageLinks.thumbnail;
    const descriptionText = book.volumeInfo.description;
    const div = document.createElement("div");
    div.classList.add("book");
    // 1.image
    const image = document.createElement("img");
    image.classList.add("book__img");
    image.src = imageUrl;
    elementList.push(image);
    elementList.push(createStyledElement("p", "book__author", `Author: ${authorText}`));
    elementList.push(createStyledElement("p", "book__title", `Title: ${titleText}`));
    elementList.push(createStyledElement("p", "book__description", `Description: ${descriptionText}`));
    elementList.forEach(element => div.appendChild(element));

    return div;
}

const createStyledElement = (element, className, text) => {
    const newElement = document.createElement(element);
    newElement.classList.add(className);
    newElement.innerHTML = text;
    return newElement;
}

searchBtn.addEventListener("click", async () => {
    displayBooks(await getBooks(searchInput.value));
})