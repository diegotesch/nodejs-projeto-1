import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Usuario from '../models/Usuario';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  usuario: Usuario;
  token: string;
}

export default class AuthUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Usuario);

    const usuario = await userRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new Error('Email/password incorreto.');
    }

    const passwordMatched = await compare(password, usuario.password);

    if (!passwordMatched) {
      throw new Error('Email/password incorreto.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: usuario.id,
      expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}
