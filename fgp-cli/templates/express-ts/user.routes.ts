import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const controller = new UserController();

router.get('/findAll', (req, res) => controller.findAll(req, res));
router.get('/findOne/:id', (req, res) => controller.findOne(req, res));
router.post('/create', (req, res) => controller.create(req, res));
router.put('/update/:id', (req, res) => controller.update(req, res));
router.delete('/remove/:id', (req, res) => controller.remove(req, res));

export default router;
