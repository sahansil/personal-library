import { Router } from "express";
import {auth}from '../middlewares/auth.js';
import { 
  getAllusers, 
  createuser, 
  getOneUser, 
  updateUser, 
  deleteUser ,
  loginUser
} from "../controllers/users.controller.js";

const router = Router();

// GET all users
router.get('/', getAllusers);

// GET one user
router.get('/:id', getOneUser);

// DELETE user
router.delete('/:id', deleteUser);

// UPDATE user
router.put('/:id', auth, updateUser);

// CREATE user
router.post('/',createuser);

// login user 
router.post('/login',loginUser);

export default router;
