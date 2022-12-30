let bookLibrary = [];
const container = document.querySelector('.books');
const new_book_form = document.querySelector('#new-book')

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function () {
        let readStatus = this.read ? "read" : "not read yet"
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    }

Book.prototype.displayBook = function (bookId) {
    let divArr = [];
    //<label class="switch">
    //    <input type="checkbox">
    //    <span class="slider round"></span>
    //</label>
    
    const wrapper           = document.createElement('div');
    const book_form         = document.createElement('div');
    const nBookTitle        = document.createElement('p');
    const nBookAuthor       = document.createElement('p');
    const nBookPages        = document.createElement('p');
    const nBookRead         = document.createElement('p');
    const statusChangeLabel = document.createElement('label');
    const statusChangeInput = document.createElement('input');
    const statusChangeSpan  = document.createElement('span');
    const delBook           = document.createElement('button');
    
    nBookTitle.textContent    = this.title;
    nBookAuthor.textContent   = this.author;
    nBookPages.textContent    = this.pages;
    nBookRead.textContent     = this.read ? "read" : "not read yet";
    statusChangeInput.checked = this.read;
    delBook.textContent       = 'Delete';
    
    wrapper.classList.add('form-wrapper');
    book_form.classList.add('g-form');
    statusChangeLabel.classList.add('switch');
    statusChangeSpan.classList.add('slider');
    statusChangeSpan.classList.add('round');
    delBook.classList.add('btn');
    delBook.classList.add('delete-book');
    
    //statusChange.textContent = 'Change';
    
    statusChangeInput.setAttribute('type','checkbox');
    delBook.setAttribute('id',`${bookId}`);
    container.appendChild(wrapper);
    wrapper.appendChild(book_form);
    
    // Create divs to append p elements to them
    for (let i = 0; i<4; i++) {
        divArr.push(document.createElement('div'));
        book_form.appendChild(divArr[i]);
    }

    divArr[0].appendChild(nBookTitle);
    divArr[1].appendChild(nBookAuthor);
    divArr[2].appendChild(nBookPages);
    divArr[3].appendChild(nBookRead);
    divArr[3].appendChild(statusChangeLabel);
    statusChangeLabel.appendChild(statusChangeInput);
    statusChangeLabel.appendChild(statusChangeSpan);
    book_form.appendChild(delBook);

    //change Read Status
    statusChangeInput.addEventListener('click', () => {
        nBookRead.textContent = this.changeStatus() ? "read" : "not read yet";
        console.log(nBookRead.textContent)
    });

    delBook.addEventListener('click', () => {deleteBook(delBook)});
}

Book.prototype.changeStatus = function () {
    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    }
    return this.read
}

function deleteBook(dbo) {
    // Delete Book from array
    delete bookLibrary[dbo.id]
    // Remove book from DOM
    dbo.parentElement.parentElement.remove()
}

// const GOT = new Book('Game of Thrones', 'George R. R. Martin', '500', false);

// console.log(GOT.info());

function addBookToLibrary () {
    const book_title = document.querySelector('.book-title');
    const book_author = document.querySelector('.book-author');
    const pages = document.querySelector('.pages');
    const read = document.querySelector('.read');
    const new_book = new Book(book_title.value, book_author.value, pages.value, read.checked);
    bookLibrary.push(new_book);

    // Close form and return to main display
    new_book_form.classList.toggle('fade-in');
    container.classList.toggle('fade-out');
    new_book.displayBook(bookLibrary.indexOf(new_book));
}


// fill the library with books initially
bookLibrary.push(new Book('Beyond Order', 'Jordan Peterson', '432', true));
bookLibrary.push(new Book('Big Mind: How The Collective Intelligence Can Change Our World', 'Geoff Mulgan', '432', false));

// display the books on the page
bookLibrary.forEach(book => {
    book.displayBook(bookLibrary.indexOf(book));
});

// Display Add book form and disable other elements 
document.querySelector('.display-form').addEventListener('click', () => {
    container.classList.toggle('fade-out');
    new_book_form.classList.toggle('fade-in');
});

// read user input when add book is clicked
document.querySelector('.add-book').addEventListener('click', () => {addBookToLibrary()});