// generate Utils

import jwt, { decode } from 'jsonwebtoken';

// generate token 
const generateToken= (user)=>{
    const token = jwt.sign({ id : user.id},process.env.JWT_SECRET,{
        expiresIn : '100h'
    });
    return token;
};

// verify token 
const verifyToken = async (token)=>{
    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }catch(error){
        return null;
    }
};
export {generateToken,verifyToken};