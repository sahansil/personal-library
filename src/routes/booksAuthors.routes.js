import { Router } from "express";
import { getAllBooksAuthors, createBooksAuthor, getOneBooksAuthor, deleteBooksAuthor } from "../controllers/booksAuthors.controller.js";

const router = Router();

router.get("/", getAllBooksAuthors);
router.post("/", createBooksAuthor);
router.get("/:id", getOneBooksAuthor);
router.delete("/:id", deleteBooksAuthor);

export default router;
