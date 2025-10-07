import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import axios from "axios";

const CSV_PATH = path.join(__dirname, "..", "src", "static", "bookbar.csv");
const JSON_PATH = path.join(__dirname, "..", "public", "book-data.json");
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

type BookRow = {
  Title?: string;
  Author?: string;
  Cover?: string;
  [key: string]: string | undefined;
};

const fetchBookCover = async (title: string, author: string): Promise<string | null> => {
  if (!API_KEY) {
    console.warn("GOOGLE_BOOKS_API_KEY is not set; skipping cover lookup.");
    return null;
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: `intitle:${title}+inauthor:${author}`,
          key: API_KEY,
        },
      }
    );

    if (response.data.items && response.data.items.length > 0) {
      const book = response.data.items[0];
      return book.volumeInfo.imageLinks?.thumbnail ?? null;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error fetching cover for ${title}:`, errorMessage);
  }

  return null;
};

const processBooks = async (): Promise<void> => {
  const csvFile = fs.readFileSync(CSV_PATH, "utf8");
  const parsed = Papa.parse<BookRow>(csvFile, { header: true });

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
  console.log("Book data with covers has been generated.");
};

void processBooks();

