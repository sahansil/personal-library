import express from 'express';
import router from './src/routes/router.js';
import bookRoutes from './src/routes/books.routes.js';
import genreRoutes from './src/routes/books.routes.js';
import authorRoutes from './src/routes/authors.routes.js';
import booksAuthorsRoutes from './src/routes/booksAuthors.routes.js';

import dotenv from 'dotenv';


import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

// Registering router
app.use('/api', router);
app.use("/api/books", bookRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books-authors", booksAuthorsRoutes);

app.get('/', (req, res) => {
    res.send('Hello from express js server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





