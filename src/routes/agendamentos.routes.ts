import { Router } from 'express';
import { parseISO } from 'date-fns';

import AgendamentoRepositorio from '../repositories/AgendamentoRepositorio';
import CreateAgendamentoService from '../services/CreateAgendamentoService';

const agendamentosRouter = Router();
const agendamentosRepositorio = new AgendamentoRepositorio();

agendamentosRouter.get('/', (req, res) => {
  return res.json(agendamentosRepositorio.all());
});

agendamentosRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAgendamento = new CreateAgendamentoService(
      agendamentosRepositorio,
    );

    const agendamento = createAgendamento.execute({
      provider,
      date: parsedDate,
    });

    return res.json(agendamento);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
});

export default agendamentosRouter;
