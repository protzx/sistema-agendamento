
export interface Servico {
  id: number;
  nome: string;
  preco: number;
  duracao: string;
}


export interface HorarioDisponivel {
  id: number;
  hora: string;
  disponivel: boolean;
}
