import { Router } from "express";
import { 
  getAllBooks, 
  createBook, 
  getOneBook, 
  updateBook, 
  deleteBook 
} from "../controllers/books.controller.js";

const router = Router();

// GET all books
router.get('/', getAllBooks);

// GET one book
router.get('/:id', getOneBook);

// CREATE book
router.post('/', createBook);

// UPDATE book
router.put('/:id', updateBook);

// DELETE book
router.delete('/:id', deleteBook);

export default router;
