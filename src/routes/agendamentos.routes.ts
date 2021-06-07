import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AgendamentoRepositorio from '../repositories/AgendamentoRepositorio';
import CreateAgendamentoService from '../services/CreateAgendamentoService';

const agendamentosRouter = Router();

agendamentosRouter.get('/', async (req, res) => {
  const agendamentosRepositorio = getCustomRepository(AgendamentoRepositorio);
  return res.json(await agendamentosRepositorio.find());
});

agendamentosRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAgendamento = new CreateAgendamentoService();

    const agendamento = await createAgendamento.execute({
      provider_id,
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
