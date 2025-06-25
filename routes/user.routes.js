import express from 'express';
import {signIn,signUp,logOut} from './../controllers/user.controller.js';
import {getCurrentUser} from './../middlewares/auth.middleware.js';

const router = express.Router();

// User registration route
router.post('/signup', signUp);
// User login route
router.post('/signin', signIn);
// User logout route    
router.post('/logout', getCurrentUser, logOut);

export default router;