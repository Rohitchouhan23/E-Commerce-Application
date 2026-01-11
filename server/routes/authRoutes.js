import express from "express"
import {body} from 'express-validator'
import {loginUser,registerUser} from '../controllers/authController.js'

const router=express.Router();

router.post('/register',[
    body('name').notEmpty().withMessage("Name required"),
    body('email').notEmpty().withMessage("Valid Email requird"),
    body('password').isLength({min:6}).withMessage("Password min 6 char")
],
registerUser
)


router.post('/login',loginUser)

export default router;