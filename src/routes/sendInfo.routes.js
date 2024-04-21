import {Router} from 'express'
import { userHistory } from '../controllers/sendInfo.controllers.js';
import authRequired from '../middlewares/authRequired.js';


const router = Router();

router.get('/userhistory', authRequired , userHistory)



export default router;