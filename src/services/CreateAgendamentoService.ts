import startOfHour from 'date-fns/startOfHour';
import Agendamento from '../models/Agendamento';
import AgendamentoRepositorio from '../repositories/AgendamentoRepositorio';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAgendamentoService {
  private agendamentosRepositorio: AgendamentoRepositorio;

  constructor(agendamentosRepositorio: AgendamentoRepositorio) {
    this.agendamentosRepositorio = agendamentosRepositorio;
  }

  public execute({ date, provider }: Request): Agendamento {
    const dataAgendamento = startOfHour(date);

    if (this.agendamentosRepositorio.findByDate(dataAgendamento)) {
      throw Error('Existe outro agendamento neste horário');
    }

    return this.agendamentosRepositorio.create({
      provider,
      date: dataAgendamento,
    });
  }
}
