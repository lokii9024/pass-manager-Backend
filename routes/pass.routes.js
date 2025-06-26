import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deletePass, updatePass,addPass } from "../controllers/pass.controller.js";

const router = express.Router();

router.post('/add-pass', verifyJWT,addPass)
router.post('/update-pass', verifyJWT, updatePass)
router.delete('/delete-pass', verifyJWT, deletePass)

export default router;