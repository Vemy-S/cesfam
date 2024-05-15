import { Router } from 'express';
import { infoUpdate } from '../controllers/user.controller.js';
import authRequired from '../middlewares/authRequired.js';

const router = Router();

//  actualizar la información del usuario
router.put('/infoupdate', authRequired, infoUpdate);


export default router;
