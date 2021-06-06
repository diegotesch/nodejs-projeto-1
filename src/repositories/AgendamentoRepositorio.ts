import { isEqual } from 'date-fns';
import Agendamento from '../models/Agendamento';

interface CreateAgendamentoDTO {
  provider: string;
  date: Date;
}

export default class AgendamentoRepositorio {
  private agendamentos: Agendamento[];

  constructor() {
    this.agendamentos = [];
  }

  public all(): Agendamento[] {
    return this.agendamentos;
  }

  public findByDate(date: Date): Agendamento | undefined {
    return this.agendamentos.find(agendamento =>
      isEqual(date, agendamento.date),
    );
  }

  public create({ provider, date }: CreateAgendamentoDTO): Agendamento {
    const agendamento = new Agendamento({ provider, date });

    this.agendamentos = [...this.agendamentos, agendamento];

    return agendamento;
  }
}
