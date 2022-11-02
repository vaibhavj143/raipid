



import  express from 'express'
import { createUser ,loginUser, logoutUser, } from '../api/user.api.js';
import { isAuthenticated } from '../middleware/isAuth.js';


const userRoutes = express.Router()

userRoutes.post("/users", createUser );
userRoutes.post("/users/login", loginUser);
userRoutes.get("/users/logout",logoutUser);



export default userRoutes;