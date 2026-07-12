import type { Servico, HorarioDisponivel } from './agendamento';
import type { Cliente } from './cliente';

export interface PedidoAgendamento {
  id?: number; 
  cliente: Cliente;
  servico: Servico;
  horario: HorarioDisponivel;
  data: string; 
  status: 'pendente' | 'confirmado' | 'cancelado';
}
