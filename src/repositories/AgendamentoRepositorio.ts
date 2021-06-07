import { EntityRepository, Repository } from 'typeorm';

import Agendamento from '../models/Agendamento';

@EntityRepository(Agendamento)
export default class AgendamentoRepositorio extends Repository<Agendamento> {
  public async findByDate(date: Date): Promise<Agendamento | null> {
    const agendamento = await this.findOne({
      where: { date },
    });

    return agendamento || null;
  }
}
