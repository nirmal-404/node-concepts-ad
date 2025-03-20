const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addAuthor(name) {
  try {
    const newlyCreatedAuthor = await prisma.author.create({
      data: {
        name,
      },
    });

    return newlyCreatedAuthor;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function deleteAuthor(id) {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id },
      include: { books: true },
    });

    return deletedAuthor;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { addAuthor, deleteAuthor };