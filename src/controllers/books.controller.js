import { prisma } from '../utils/prisma-client.js';

// GET all books (with optional search by title)
export const getAllBooks = async (req, res) => {
  try {
    const { title } = req.query;
    const books = await prisma.books.findMany({
      where: {
        ...(title && { title: { contains: title } }),
      },
      include: {
        Genre: true,
        BooksAuthors: {
          include: { Authors: true }
        }
      }
    });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// CREATE book
export const createBook = async (req, res) => {
  try {
    const { title, pages, published_date, blurb, cover_image, genresId } = req.body;

    if (!title || !pages || !published_date || !genresId) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const book = await prisma.books.create({
      data: {
        title,
        pages,
        published_date: new Date(published_date),
        blurb,
        cover_image,
        genresId,
      }
    });

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET one book by ID
export const getOneBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = await prisma.books.findUnique({
      where: { id: bookId },
      include: {
        Genre: true,
        BooksAuthors: { include: { Authors: true } }
      }
    });

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE book
export const updateBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const body = req.body;

    const existingBook = await prisma.books.findUnique({ where: { id: bookId } });
    if (!existingBook) return res.status(404).json({ error: "Book not found" });

    const updatedBook = await prisma.books.update({
      where: { id: bookId },
      data: {
        title: body.title,
        pages: body.pages,
        published_date: body.published_date ? new Date(body.published_date) : undefined,
        blurb: body.blurb,
        cover_image: body.cover_image,
        genresId: body.genresId
      }
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE book
export const deleteBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    await prisma.books.delete({
      where: { id: bookId },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
