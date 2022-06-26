const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }   
}

let main = document.querySelector("main");
main.style["display"] = "flex";
main.style["flex-direction"] = "column";
main.style["justify-content"] = "flex-start";
main.style["align-items"] = "center";
main.style["padding"] = "20px";
main.style["gap"] = "20px";
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function deleteBook() {
    myLibrary.splice(parseInt(this.getAttribute("index")), 1);
    displayBooks();
}

function changeReadStatus() {
    let thisBook = myLibrary[parseInt(this.getAttribute("index"))];
    thisBook.read = !thisBook.read;
    displayBooks();
}

function displayBooks() {
    let main = document.querySelector("main");
    let mainBooks = [...document.querySelectorAll("main>section")];
    for (let book of mainBooks) {
        main.removeChild(book);
    }

    for (let book of myLibrary) {
        let bookSection = document.createElement("section");
        bookSection.style["background-color"] = "rgb(217, 231, 252)";
        bookSection.style["width"] = "90%";
        bookSection.style["padding"] = "20px";
        let text = `Title: ${book.title}, author: ${book.author}, number of pages: ${book.pages},`;
        let read = book.read ? "is read" : "not read";
        text = text + read;
        let p = document.createElement("p");
        p.textContent = text;
        let p2 = document.createElement("p");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.setAttribute("index", myLibrary.indexOf(book));
        deleteButton.addEventListener("click", deleteBook);
        let changeReadButton = document.createElement("button");
        changeReadButton.textContent = "Change read status";
        changeReadButton.setAttribute("index", myLibrary.indexOf(book));
        changeReadButton.addEventListener("click", changeReadStatus);
        p2.style["display"] = "flex";
        p2.style["flex-direction"] = "row";
        p2.style["justify-content"] = "flex-end";
        p2.style["align-items"] = "center";
        p2.appendChild(changeReadButton);
        p2.appendChild(deleteButton);
        bookSection.appendChild(p);
        bookSection.appendChild(p2);
        main.appendChild(bookSection);
    }
}

let displayBooksButton = document.querySelector("aside>button#display-books");
displayBooksButton.addEventListener("click", displayBooks);

function addInput(form, type, id, textContent) {
    let p = document.createElement("p");
    let input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", type);
    input.setAttribute("name", "title-input");
    let inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", "title-intput");
    inputLabel.textContent = textContent;
    p.appendChild(inputLabel);
    p.appendChild(input);
    form.appendChild(p);
}

function formStyle(form) {
    form.style["display"] = "flex";
    form.style["flex-direction"] = "column";
    form.style["justify-content"] = "flex-start";
    form.style["align-items"] = "flex-start";
    form.style["gap"] = "20px";
    form.style["position"] = "fixed";
    form.style["top"] = "25%";
    form.style["left"] = "25%";
    form.style["height"] = "50%";
    form.style["width"] = "50%";
    form.style["background-color"] = "rgb(209, 235, 235)";
    form.style["padding"] = "20px";
    form.style["box-shadow"] = "0px 0px 10px 10px #888888";
}

function createBook() {
    let titleInput = document.querySelector("#title");
    let authorInput = document.querySelector("#author");
    let pagesInput = document.querySelector("#pages");
    let readInput = document.querySelector("#read");
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked)
    let form = document.querySelector("form");
    let main = document.querySelector("main");
    main.removeChild(form);
    displayBooks();
}

function cancelBook() {
    let form = document.querySelector("form");
    let main = document.querySelector("main");
    main.removeChild(form);
}

function newBookForm() {
    if (document.querySelector("form")) {
        return;
    }
    let main = document.querySelector("main");
    let form = document.createElement("form");
    let createButton = document.createElement("button");
    createButton.textContent = "Create Book";
    createButton.setAttribute("type", "button");
    createButton.setAttribute("id", "create-button");
    createButton.addEventListener("click", createBook);
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("id", "cancel-button");
    cancelButton.addEventListener("click", cancelBook);
    let buttonP = document.createElement("p");
    buttonP.style["display"] = "flex";
    buttonP.style["flex-direction"] = "row";
    buttonP.style["flex"] = "1 1 auto";
    buttonP.style["justify-content"] = "flex-end";
    buttonP.style["align-items"] = "flex-end";
    buttonP.style["width"] = "100%";
    buttonP.style["gap"] = "20px";
    buttonP.appendChild(createButton);
    buttonP.appendChild(cancelButton);
    addInput(form, "text", "title", "Title: ");
    addInput(form, "text", "author", "Author: ");
    addInput(form, "number", "pages", "Number of pages: ");
    addInput(form, "checkbox", "read", "Have you read it: ");
    form.appendChild(buttonP);
    formStyle(form);
    main.appendChild(form);
}

let newBookButton = document.querySelector("aside>button#new-book");
newBookButton.addEventListener("click", newBookForm);