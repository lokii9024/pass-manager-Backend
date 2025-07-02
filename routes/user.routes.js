import express from 'express';
import {signIn,signUp,logOut, getCurrentUser} from './../controllers/user.controller.js';
import {verifyJWT} from './../middlewares/auth.middleware.js';

const router = express.Router();

// User registration route
router.post('/signup', signUp);
// User login route
router.post('/signin', signIn);
// User logout route    
router.post('/logout', verifyJWT, logOut);
//get current user route
router.get('/me',verifyJWT,getCurrentUser)

export default router;