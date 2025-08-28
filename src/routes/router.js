//It is a router file generally usedd to manage all the routes and routes files

import { Router } from "express";   
import userRoutes from './user.routes.js'


const router = Router();

router.use('/users',userRoutes)

export default router;

   