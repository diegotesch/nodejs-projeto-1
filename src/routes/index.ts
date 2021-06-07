import { Router } from 'express';
import agendamentosRouter from './agendamentos.routes';
import usuarioRouter from './usuarios.routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRouter);
routes.use('/usuarios', usuarioRouter);

export default routes;
