import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const authRouter = Router();

authRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = new AuthUserService();

    const { usuario, token } = await auth.execute({ email, password });

    delete usuario.password;

    return res.json({ usuario, token });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
});

export default authRouter;
