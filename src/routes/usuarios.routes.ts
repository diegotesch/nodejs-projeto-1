import { Router } from 'express';
import multer from 'multer';
import uploadConf from '../config/upload';

import CreateUsuarioService from '../services/CreateUsuarioService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import authMiddleware from '../middlewares/authMiddleware';

const usuarioRouter = Router();
const upload = multer(uploadConf);

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

usuarioRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateAvatar = new UpdateUserAvatarService();

      const usuario = await updateAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      delete usuario.password;

      return res.json(usuario);
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
);

export default usuarioRouter;
