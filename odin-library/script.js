//Functions
function Book(title, author, pages, read) {
  //Function constructor to create a book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.toggleRead = function () {
    this.read = !this.read;
  };
}

function fetchLibraryFromStorage() {
  //Function to fetch library from local storage
  let library = [];
  if (!localStorage.getItem("Library")) {
    return library;
  } else {
    library = JSON.parse(localStorage.getItem("Library"));
    return library;
  }
}

function updateLibraryInStorage(library) {
  //Function to store library in local storage
  storeLibrary = JSON.stringify(library);
  localStorage.setItem("Library", storeLibrary);
}

function addBookToLibrary(book) {
  //Function to add a book to library
  let library = fetchLibraryFromStorage();
  let index = library.length;
  book.index = index;
  library.push(book);
  updateLibraryInStorage(library);
  //TODO:Update UI
}

function removeBookFromLibrary(removalIndex) {
  // Function to remove book from library
  let library = fetchLibraryFromStorage();
  library.forEach((book) => {
    if (book.index > removalIndex) {
      book.index = book.index - 1;
    }
  });
  library.splice(removalIndex, 1); //Remove book from library array
  updateLibraryInStorage(library);
  //TODO: Update UI
}

function changeBookReadStatus(bookIndex) {
  //Function to toggle book read status
  let library = fetchLibraryFromStorage();
  library[bookIndex].toggleRead(); //Change read status
  updateLibraryInStorage(library);
  //TODO: Update UI
}

function displayBooks() {
  //Function to display books
  let library = fetchLibraryFromStorage();
  if (library.length > 0) {
    let displayContainer = document.getElementById("container");
    library.forEach((book) => {
      // let bookDiv = document.createElement("div");
      // bookDiv.innerHTML = book.title;
      displayContainer.appendChild(addBookToDisplay(book));
    });
  }
}

function addBookToDisplay(book) {
  let bookDiv = document.createElement("div");
  let bookTitle = document.createElement("div");
  bookTitle.innerHTML = book.title;
  bookTitle.style.fontSize = "3vh";
  bookTitle.style.fontWeight = "600";
  let bookAuthor = document.createElement("div");
  bookAuthor.innerHTML = "by " + book.author;
  bookAuthor.style.fontSize = "2vh";
  bookAuthor.style.fontWeight = "400";
  let bookPages = document.createElement("div");
  bookPages.innerHTML = "Pages: " + book.pages;
  bookPages.style.fontSize = "1.5vh";

  let bookRead = document.createElement("div");
  bookRead.innerHTML = "Read? ";

  let bookReadCheck = document.createElement("input");
  bookReadCheck.type = "checkbox";
  if (book.read) {
    bookReadCheck.checked = true;
  }
  bookReadCheck.addEventListener("click", () => {
    changeBookReadStatus(book.index);
  });
  bookRead.appendChild(bookReadCheck);
  bookRead.style.display = "flex";
  bookRead.style.justifyContent = "center";

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookRead);
  bookDiv.style.alignSelf = "center";
  bookDiv.style.justifySelf = "center";
  bookDiv.style.margin = "10px";
  bookDiv.style.padding = "10px 10px";
  bookDiv.style.gap = "1vh";
  bookDiv.style.backgroundColor = "white";
  bookDiv.style.borderRadius = "10px";
  bookDiv.style.height = "auto";
  bookDiv.style.width = "90%";
  bookDiv.style.display = "flex";
  bookDiv.style.flexDirection = "column";
  bookDiv.style.justifyContent = "space-evenly";
  bookDiv.style.alignItems = "center";
  return bookDiv;
}

function openFormPopup() {
  document.getElementById("formPopup").style.display = "block"; //Show form to add book
}

function closeFormPopup() {
  document.getElementById("formPopup").style.display = "none"; //Hide form to add book
}

//EventListeners
let addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", () => {
  openFormPopup();
});

let closeFormButton = document.getElementById("closeFormButton");
closeFormButton.addEventListener("click", () => {
  closeFormPopup();
});

//Execute at run
displayBooks();

//Testing here

// let book1 = new Book("Dune", "Frank H", 200, true);
// console.log(book1);
// addBookToLibrary(book1);
// let library = fetchLibraryFromStorage();
// console.log(library);
