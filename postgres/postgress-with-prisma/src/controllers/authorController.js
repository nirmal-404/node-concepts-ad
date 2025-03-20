const authorService = require("../services/authorService");

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const author = await authorService.addAuthor(name);
    res.status(201).json(author);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const deletedResult = await authorService.deleteAuthor(
      parseInt(req.params.id)
    );
    res
      .status(200)
      .json({
        message: `Author deleted with id ${req.params.id}`,
        deletedResult,
      });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};