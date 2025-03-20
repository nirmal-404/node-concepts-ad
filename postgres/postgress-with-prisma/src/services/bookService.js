const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addBook(title, publisedDate, authorId) {
  try {
    const newlyCreatedBook = await prisma.book.create({
      data: {
        title,
        publisedDate,
        author: {
          connect: { id: authorId },
        },
      },
      include: { author: true },
    });

    return newlyCreatedBook;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getAllBooks() {
  try {
    const books = await prisma.book.findMany({
      include: { author: true },
    });

    return books;
  } catch (e) {
    throw e;
  }
}

async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }

    return book;
  } catch (e) {
    throw e;
  }
}

async function updateBook(id, newTitle) {
  try {
    // const book = await prisma.book.findUnique({
    //   where: { id },
    //   include: { author: true },
    // });

    // if (!book) {
    //   throw new Error(`Book with id ${id} not found`);
    // }
    // const updatedBook = await prisma.book.update({
    //   where: { id },
    //   data: {
    //     title: newTitle,
    //   },
    //   include: {
    //     author: true,
    //   },
    // });

    // return updatedBook;

    //using transactions
    const updatedBook = await prisma.$transaction(async (prisma) => {
      const book = await prisma.book.findUnique({ where: { id } });
      if (!book) {
        throw new Error(`Book with id ${id} not found`);
      }

      return prisma.book.update({
        where: { id },
        data: {
          title: newTitle,
        },
        include: {
          author: true,
        },
      });
    });

    return updatedBook;
  } catch (e) {
    throw e;
  }
}

async function deleteBook(id) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
      include: { author: true },
    });

    return deletedBook;
  } catch (e) {
    throw error;
  }
}

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };