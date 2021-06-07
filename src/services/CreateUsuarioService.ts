import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Usuario from '../models/Usuario';

interface Request {
  nome: string;
  email: string;
  password: string;
}

export default class CreateUsuarioService {
  public async execute(data: Request): Promise<Usuario> {
    const usuarioRepository = getRepository(Usuario);

    const { email, password: passText } = data;

    const checkUsuarioExiste = await usuarioRepository.findOne({
      where: { email },
    });

    if (checkUsuarioExiste) {
      throw new Error('Email já está em uso!');
    }

    const password = await hash(passText, 8);

    const usuario = usuarioRepository.create({
      ...data,
      password,
    });

    await usuarioRepository.save(usuario);

    return usuario;
  }
}
