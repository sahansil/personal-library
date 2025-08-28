import { prisma } from '../utils/prisma-client.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt';

// GET all users
const getAllusers = async (req, res) => {
  try {
    const { name, email } = req.query;
    const users = await prisma.user.findMany(
      {
        where: {
          ...(name && { name: { contains: name } }),
          ...(email && { email: { contains: email } })
        }
      }
    );
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// CREATE user
const createuser = async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body;

    if (!name || !email || !phone_number || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { name, email, phone_number, password: hashedpassword },
    });

    const { password: passwords, ..._user } = user;

    res.status(201).json(_user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// GET one user by ID
const getOneUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// UPDATE user
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const body = req.body;
  const loggedInUser = req.user;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      }
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User Not found" });
    }

    if (loggedInUser.id !== parseInt(userId)) {
      return res.status(403).json({ message: "you can not update info of " })
    }


    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name,
        email: body.email,
        phone_number: body.phone_number,
        password: body.password,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.log(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//loginUser
// src/controllers/users.controller.js
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Example: Fetch user from database (replace with your DB logic)
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Example: Compare password (replace with bcrypt if hashed)

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // If everything is fine
    const token = generateToken(user);
    res.status(200).json({
      message: "Login Sucessful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_Number,
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllusers,
  createuser,
  getOneUser,
  updateUser,
  deleteUser,
};
