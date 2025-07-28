require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const axios = require('axios');

const CSV_PATH = path.join(__dirname, '..', 'src', 'static', 'bookbar.csv');
const JSON_PATH = path.join(__dirname, '..', 'public', 'book-data.json');
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const fetchBookCover = async (title, author) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${API_KEY}`
    );
    if (response.data.items && response.data.items.length > 0) {
      const book = response.data.items[0];
      return book.volumeInfo.imageLinks?.thumbnail || null;
    }
  } catch (error) {
    console.error(`Error fetching cover for ${title}:`, error.message);
  }
  return null;
};

const processBooks = async () => {
  const csvFile = fs.readFileSync(CSV_PATH, 'utf8');
  const parsed = Papa.parse(csvFile, { header: true });

  const booksWithCovers = await Promise.all(
    parsed.data.map(async (book) => {
      if (book.Title && book.Author) {
        const cover = book.Cover || (await fetchBookCover(book.Title, book.Author));
        return { ...book, cover };
      }
      return book;
    })
  );

  fs.writeFileSync(JSON_PATH, JSON.stringify(booksWithCovers, null, 2));
  console.log('Book data with covers has been generated.');
};

processBooks(); 