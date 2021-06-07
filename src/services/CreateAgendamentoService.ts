import startOfHour from 'date-fns/startOfHour';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../models/Agendamento';
import AgendamentoRepositorio from '../repositories/AgendamentoRepositorio';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAgendamentoService {
  public async execute({ date, provider }: Request): Promise<Agendamento> {
    const agendamentosRepositorio = getCustomRepository(AgendamentoRepositorio);

    const dataAgendamento = startOfHour(date);

    if (await agendamentosRepositorio.findByDate(dataAgendamento)) {
      throw Error('Existe outro agendamento neste horário');
    }

    const agendamento = agendamentosRepositorio.create({
      provider,
      date: dataAgendamento,
    });

    await agendamentosRepositorio.save(agendamento);

    return agendamento;
  }
}
