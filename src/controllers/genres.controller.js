
import { prisma } from '../utils/prisma-client.js';

// GET all genres
export const getAllGenres = async (req, res) => {
  try {
    const genres = await prisma.genres.findMany({
      include: { Books: true }
    });
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// CREATE genre
export const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const genre = await prisma.genres.create({ data: { name } });
    res.status(201).json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET one genre
export const getOneGenre = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const genre = await prisma.genres.findUnique({
      where: { id },
      include: { Books: true }
    });
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    res.status(200).json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE genre
export const updateGenre = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const updated = await prisma.genres.update({
      where: { id },
      data: { name }
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') return res.status(404).json({ error: "Genre not found" });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE genre
export const deleteGenre = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.genres.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') return res.status(404).json({ error: "Genre not found" });
    res.status(500).json({ error: "Internal Server Error" });
  }
};
