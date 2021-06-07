import { Router } from 'express';
import agendamentosRouter from './agendamentos.routes';
import usuarioRouter from './usuarios.routes';
import authRouter from './auth.routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRouter);
routes.use('/usuarios', usuarioRouter);
routes.use('/auth', authRouter);

export default routes;
