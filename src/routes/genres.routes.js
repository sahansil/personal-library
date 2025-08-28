import { Router } from "express";
import { getAllGenres, createGenre, getOneGenre, updateGenre, deleteGenre } from "../controllers/genres.controller.js";

const router = Router();

router.get("/", getAllGenres);
router.post("/", createGenre);
router.get("/:id", getOneGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
