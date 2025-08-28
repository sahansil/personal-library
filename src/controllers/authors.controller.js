import { prisma } from '../utils/prisma-client.js';

// GET all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await prisma.authors.findMany({
      include: { BooksAuthors: { include: { Books: true } } }
    });
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// CREATE author
export const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = await prisma.authors.create({ data: { name, bio } });
    res.status(201).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET one author
export const getOneAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const author = await prisma.authors.findUnique({
      where: { id },
      include: { BooksAuthors: { include: { Books: true } } }
    });
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE author
export const updateAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, bio } = req.body;

    const updated = await prisma.authors.update({
      where: { id },
      data: { name, bio }
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') return res.status(404).json({ error: "Author not found" });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE author
export const deleteAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.authors.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') return res.status(404).json({ error: "Author not found" });
    res.status(500).json({ error: "Internal Server Error" });
  }
};
