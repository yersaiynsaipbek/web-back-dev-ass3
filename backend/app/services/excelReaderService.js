const xlsx = require('xlsx');
const authorService = require('./authorService');
const bookService = require('./bookService');
const genreService = require('./genreService');
const Book = require('../models/bookModel')

exports.readAll = (excelFile) => {
    const workbook = xlsx.readFile(excelFile);

    const authorSheetName = workbook.SheetNames[0];
    const bookSheetName = workbook.SheetNames[1];
    const genreSheetName = workbook.SheetNames[2];

    const authorWorksheet = workbook.Sheets[authorSheetName];
    const bookWorksheet = workbook.Sheets[bookSheetName];
    const genreWorksheet = workbook.Sheets[genreSheetName];

    const authorsFromExcel = xlsx.utils.sheet_to_json(authorWorksheet);
    const bookFromExcel = xlsx.utils.sheet_to_json(bookWorksheet);
    const genreFromExcel = xlsx.utils.sheet_to_json(genreWorksheet);

    authorsFromExcel.forEach(authorData => {
        const result = authorService.addAuthor(authorData);
        console.log(result);
    });

    bookFromExcel.forEach(bookData => {
        const bookObject = Book.create(
            bookData.title,
            bookData.author,
            parseInt(bookData.publishYear),
            parseInt(bookData.pageCount),
            parseInt(bookData.price)
        );
        const result = bookService.addBook(bookObject);
        console.log(result);
    })

    genreFromExcel.forEach(genre => {
        const result = genreService.addGenre(genre);
        console.log(result);
    })
}

exports.getExcelFile = () => {
    const authors = authorService.getAllAuthor();
    const books = bookService.getAllBooks();
    const genres = genreService.getAllGenre();

    const workSheetAuthor = xlsx.utils.json_to_sheet(authors);
    const workSheetBook = xlsx.utils.json_to_sheet(books);
    const workSheetGenres = xlsx.utils.json_to_sheet(genres);

    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheetAuthor, 'Authors')
    xlsx.utils.book_append_sheet(workBook, workSheetBook, 'Book')
    xlsx.utils.book_append_sheet(workBook, workSheetGenres, 'Genres')

    const filePath = 'export_data.xlsx';

    xlsx.writeFile(workBook, filePath);

    return filePath;
}