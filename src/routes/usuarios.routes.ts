import { Router } from 'express';

import CreateUsuarioService from '../services/CreateUsuarioService';

const usuarioRouter = Router();

usuarioRouter.post('/', async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    const createUser = new CreateUsuarioService();

    const usuario = await createUser.execute({ nome, email, password });

    delete usuario.password;

    return res.json(usuario);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
});

export default usuarioRouter;
