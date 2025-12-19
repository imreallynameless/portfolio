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

type BookWithCover = BookRow & {
  cover?: string | null;
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

const loadExistingBookData = (): Map<string, BookWithCover> => {
  const existingCovers = new Map<string, BookWithCover>();
  
  if (fs.existsSync(JSON_PATH)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(JSON_PATH, "utf8")) as BookWithCover[];
      for (const book of existingData) {
        if (book.Title && book.Author) {
          const key = `${book.Title}|${book.Author}`.toLowerCase();
          existingCovers.set(key, book);
        }
      }
      console.log(`Loaded ${existingCovers.size} existing book covers from cache.`);
    } catch (error) {
      console.warn("Could not load existing book data, starting fresh:", error);
    }
  }
  
  return existingCovers;
};

const processBooks = async (): Promise<void> => {
  const csvFile = fs.readFileSync(CSV_PATH, "utf8");
  const parsed = Papa.parse<BookRow>(csvFile, { header: true });
  
  // Load existing book data to preserve covers
  const existingBookData = loadExistingBookData();

  const booksWithCovers = await Promise.all(
    parsed.data.map(async (book) => {
      if (book.Title && book.Author) {
        const key = `${book.Title}|${book.Author}`.toLowerCase();
        const existingBook = existingBookData.get(key);
        
        // Use existing cover if available, otherwise try CSV Cover field, then fetch
        let cover: string | null | undefined = existingBook?.cover;
        
        if (!cover && book.Cover) {
          cover = book.Cover;
        }
        
        // Only fetch if we don't have a cover
        if (!cover) {
          console.log(`Fetching cover for: ${book.Title}`);
          cover = await fetchBookCover(book.Title, book.Author);
        } else {
          console.log(`Using cached cover for: ${book.Title}`);
        }
        
        return { ...book, cover };
      }
      return book;
    })
  );

  fs.writeFileSync(JSON_PATH, JSON.stringify(booksWithCovers, null, 2));
  console.log("Book data with covers has been generated.");
};

void processBooks();

