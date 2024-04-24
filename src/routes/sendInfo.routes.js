import {Router} from 'express'
import { userHistory, userInfo } from '../controllers/sendInfo.controllers.js';
import authRequired from '../middlewares/authRequired.js';


const router = Router();

//user 
router.get('/userhistory', authRequired , userHistory)
router.get('/userinfo', authRequired , userInfo)



export default router;