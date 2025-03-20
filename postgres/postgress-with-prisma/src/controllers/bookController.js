const bookService = require("../services/bookService");

exports.addBook = async (req, res) => {
  try {
    const { title, publisedDate, authorId } = req.body;
    const book = await bookService.addBook(
      title,
      new Date(publisedDate),
      authorId
    );

    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(parseInt(req.params.id));

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title } = req.body;
    const book = await bookService.updateBook(parseInt(req.params.id), title);

    res.json(book);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(parseInt(req.params.id));
    res.json({ message: `Deleted book with id ${req.params.id}` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};