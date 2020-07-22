let library = [];
let bookCount = library.length;
const submitButton = document.getElementById("submitButton");
const addBookForm = document.getElementById("bookForm");
const book = new Book();
const bookDisplay = document.getElementById("book");
const libraryDisplay = document.getElementById("libraryDisplay");
const addBookDiv =
  '<div id="addBook"><span id="icon" onclick="addForm()"><i class="fas fa-plus"></i></span></div>';
const formDiv = document.getElementById("form");

function Book(name, author, pages, read, index) {
  this.name = name;
  this.author = author;
  this.numberOfPages = pages;
  this.hasBeenRead = read;
  this.numberInList = index;
  this.info = function () {
    return name + " by " + author + ", " + pages + " pages, " + read;
  };
  this.bookHtml = `<div class="book" id="${index}"><div id="actions"><span id="read" onclick="toogleRead(${index})">Toggle Read</span><span id="delete" onclick="deleteFromLibrary(${index})"><i class="far fa-trash-alt"></i></div><div id="bookTitle"><h1>${name}</h1></div><div id="bookInfo"><ul><li>Author: ${author}</li><li>No. of pages: ${pages}</li><li>Read?: ${read}</li></ul></div></div>`;
}

function addToLibrary() {
  if (validate() === true) {
    libraryDisplay.innerHTML = "";
    library.push(
      new Book(
        addBookForm.elements[0].value,
        addBookForm.elements[1].value,
        addBookForm.elements[2].value,
        addBookForm.elements[3].value,
        bookCount++
      )
    );
    formDiv.style.visibility = "hidden";
    librarySetup();
    clearForm();
  }
}

function librarySetup() {
  library.forEach(function (book, index) {
    libraryDisplay.innerHTML += book.bookHtml;
  });
  libraryDisplay.innerHTML += addBookDiv;
}

function addForm() {
  formDiv.style.visibility = "visible";
}

function deleteFromLibrary(index) {
  for (let i = 0; i < library.length; i++) {
    if (library[i].numberInList === index) {
      document.getElementById(index).remove();
      library.splice(i, 1);
    }
  }

  console.log(library);
}

function toogleRead(index) {
  var container;
  var read;
  for (let i = 0; i < library.length; i++) {
    if (library[i].numberInList === index) {
      container = document.getElementById(index);
      readSection = container.children[2].children[0];
      if (readSection.children[2].innerHTML === "Read?: yes") {
        readSection.children[2].innerHTML = "Read?: no";
      } else {
        readSection.children[2].innerHTML = "Read?: yes";
      }
    }
  }
}

function validate() {
  if (document.myForm.title.value == "") {
    alert("Please provide book title!");
    document.myForm.title.focus();
    return false;
  }
  if (document.myForm.author.value == "") {
    alert("Please provide book author");
    document.myForm.author.focus();
    return false;
  }
  if (document.myForm.pages.value == "") {
    alert("Please provide number of pages.");
    document.myForm.pages.focus();
    return false;
  }

  return true;
}

function clearForm() {
  document.myForm.title.value = "";
  document.myForm.author.value = "";
  document.myForm.pages.value = "";
}

function cancelAddition() {
  formDiv.style.visibility = "hidden";
  clearForm();
}
