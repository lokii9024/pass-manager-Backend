import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deletePass, updatePass,addPass, getAllPasses } from "../controllers/pass.controller.js";

const router = express.Router();

router.post('/add-pass', verifyJWT,addPass)
router.post('/update-pass/:id', verifyJWT, updatePass)
router.delete('/delete-pass/:id', verifyJWT, deletePass)
router.get('/get-passes',verifyJWT,getAllPasses)

export default router;