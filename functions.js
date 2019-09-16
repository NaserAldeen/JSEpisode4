/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
// import books from "./books.json";
function getBookById(bookId, books) {
  // Your code goes here
  // var bookk;
  // books.forEach(function(book){
  //   if (book["id"] === bookId) {
      
  //   bookk = book
  //   }
  // });
  // return bookk

  let bookFound = books.find(function(book){
    return book["id"] === bookId
  })
  return bookFound
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  let authorFound = authors.find(function(author){
    return author["name"].toLowerCase() == authorName.toLowerCase()
  })
  return authorFound
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here

  let formattedAuthors = authors.map(function(author) {
    return {author: author["name"], bookCount: author["books"].length}
  })

  return formattedAuthors
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  // Your code goes here

  books.forEach(function(book){
    if (colors[book["color"]]) {
      colors[book["color"]].push(book["title"])
    }
    else {
      colors[book["color"]] = [book["title"]]
    }
  })
  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let titles = []
  books.forEach(function(book){
    book["authors"].forEach(function(auth) {
       if (auth["name"].toLowerCase() == authorName.toLowerCase()) {
         titles.push(book["title"])
        
       }
    })
 
  })
 
  return titles
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
   let x =  bookCountsByAuthor(authors).sort(function(a, b){
    if (a.bookCount > b.bookCount) return 1;
    if (b.bookCount > a.bookCount) return -1;
  
    return 0;
  });
  return x[x.length -1].author 

}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let titles = []
  let auths = []
  let book = getBookById(bookId, books)
  book["authors"].forEach(function(auth) { 
    titles.push(...titlesByAuthorName(auth.name, authors, books))
 })

 //This is to remove the duplicates
//  let unique = [...new Set(titles)];
//   return unique
return titles
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  authors.forEach(author1 => {
    author1.score = 0;
    authors.forEach(author2 => {
      if (author1.name !== author2.name) {
        const sharedBooks = author1.books.filter(bookId =>
          author2.books.includes(bookId)
        );
        author1.score += sharedBooks.length;
      }
    });
  });

  authors.sort(function(a, b){
    if (a.score > b.score) return 1;
    if (b.score > a.score) return -1;
    return 0;
  });
  return authors[authors.length -1 ]["name"]
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

// const authors = require("./authors.json");
// const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
