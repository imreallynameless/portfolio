import * as functions from "firebase-functions";
import axios from "axios";
import corsLib from "cors";

const cors = corsLib({ origin: true });

export const getBookCover = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { title, author } = req.query as { title?: string; author?: string };
    const apiKey = functions.config().books?.key;

    if (!title || !author) {
      res.status(400).send("Missing title or author");
      return;
    }

    if (!apiKey) {
      res.status(500).send("Missing Google Books API key configuration");
      return;
    }

    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: `intitle:${title}+inauthor:${author}`,
            key: apiKey,
          },
        }
      );

      if (response.data.items && response.data.items.length > 0) {
        const book = response.data.items[0];
        const cover = book.volumeInfo?.imageLinks?.thumbnail ?? null;
        res.status(200).send({ cover });
      } else {
        res.status(404).send({ cover: null });
      }
    } catch (error) {
      console.error("Error fetching book cover:", error);
      res.status(500).send("Error fetching book cover");
    }
  });
});

