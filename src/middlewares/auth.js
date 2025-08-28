// authentication middleware

import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../utils/prisma-client.js";

const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "user not found " });

    }

    try {
        const payload = await verifyToken(token);
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
   delete user.password;
        console.log("Authenticated user:",user);
        req.user = user;
        // fetch user from database with the given payload Id
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "user not found" });

    }
};

export { auth };