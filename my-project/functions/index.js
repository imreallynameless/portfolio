const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });

exports.getBookCover = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { title, author } = req.query;
    const apiKey = functions.config().books.key;

    if (!title || !author) {
      return res.status(400).send("Missing title or author");
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${apiKey}`
      );
      if (response.data.items && response.data.items.length > 0) {
        const book = response.data.items[0];
        const cover = book.volumeInfo.imageLinks?.thumbnail;
        return res.status(200).send({ cover });
      } else {
        return res.status(404).send({ cover: null });
      }
    } catch (error) {
      console.error("Error fetching book cover:", error);
      return res.status(500).send("Error fetching book cover");
    }
  });
}); 