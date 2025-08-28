import { Router } from "express";
import { getAllAuthors, createAuthor, getOneAuthor, updateAuthor, deleteAuthor } from "../controllers/authors.controller.js";

const router = Router();

router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.get("/:id", getOneAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
