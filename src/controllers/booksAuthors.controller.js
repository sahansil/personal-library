import { prisma } from '../utils/prisma-client.js';

// GET all book-author links
export const getAllBooksAuthors = async (req, res) => {
  try {
    const records = await prisma.booksAuthors.findMany({
      include: { Books: true, Authors: true }
    });
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// CREATE link
export const createBooksAuthor = async (req, res) => {
  try {
    const { bookId, authorId } = req.body;
    if (!bookId || !authorId) return res.status(400).json({ error: "bookId and authorId required" });

    const record = await prisma.booksAuthors.create({ data: { bookId, authorId } });
    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET one link
export const getOneBooksAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const record = await prisma.booksAuthors.findUnique({
      where: { id },
      include: { Books: true, Authors: true }
    });
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE link
export const deleteBooksAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.booksAuthors.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') return res.status(404).json({ error: "Record not found" });
    res.status(500).json({ error: "Internal Server Error" });
  }
};
