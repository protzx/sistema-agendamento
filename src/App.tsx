import { useState, useEffect } from 'react';
import type { Servico, HorarioDisponivel } from './types/agendamento';

const SERVICOS_MOCK: Servico[] = [
  { id: 1, nome: "Corte de Cabelo", preco: 35, duracao: "30 min" },
  { id: 2, nome: "Barba Completa", preco: 25, duracao: "20 min" },
  { id: 3, nome: "Combo Cabelo + Barba", preco: 50, duracao: "50 min" }
];

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [horarios, setHorarios] = useState<HorarioDisponivel[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<HorarioDisponivel | null>(null);
  const [nomeCliente, setNomeCliente] = useState<string>('');

  useEffect(() => {
    async function buscarDados() {
      try {
        const resposta = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRk1F8zAZC_LAv1pY3rFshKoO7NGC5lvN_ECwTKvwJ90JCoy9SV-E_Tl35XsQsGwxk_Vbxq5YY1GWiu/pub?output=csv');
        const textocsv = await resposta.text();
        const linhas = textocsv.split('\n');

        const dadosFormatados: HorarioDisponivel[] = linhas
          .slice(1)
          .filter(linha => linha.trim() !== '')
          .map((linha, index) => {
            const colunas = linha.split(',');

            return {
              id: index + 1,
              hora: colunas[1]?.trim(),
              disponivel: colunas[2]?.trim().toUpperCase() === 'TRUE'
            };
          });

        setHorarios(dadosFormatados);
      } catch (erro) {
        console.error('Erro ao processar as linhas da planilha:', erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, []);

  const enviarPedidoWhatsapp = () => {
    if (!servicoSelecionado || !horarioSelecionado) return;

    const numeroLoja = '5542999936768';
    const mensagem = `*Novo Agendamento!* 🗓️\n\n` +
      `• *Cliente:* ${nomeCliente}\n` +
      `• *Serviço:* ${servicoSelecionado.nome}\n` +
      `• *Valor:* R$ ${servicoSelecionado.preco},00\n` +
      `• *Duração:* ${servicoSelecionado.duracao}\n` +
      `• *Horário:* ${horarioSelecionado.hora}`;

    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  if (carregando) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '450px', margin: '0 auto', color: '#333' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Agendamento Online 🗓️</h1>
        <p style={{ textAlign: 'center' }}>Carregando horários...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '450px', margin: '0 auto', color: '#333' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Agendamento Online 🗓️</h1>

      <p style={{ fontWeight: 'bold' }}>1. Digite seu nome:</p>
      <input
        type="text"
        placeholder="Seu nome"
        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' }}
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
      />
      <p style={{ fontWeight: 'bold' }}>2. Selecione um serviço:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SERVICOS_MOCK.map((servico) => {
          const ehEsteServico = servicoSelecionado?.id === servico.id;
          return (
            <div
              key={servico.id}
              onClick={() => {
                setServicoSelecionado(servico);
                setHorarioSelecionado(null);
              }}
              style={{
                padding: '15px',
                border: ehEsteServico ? '2px solid #007bff' : '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: ehEsteServico ? '#e7f3ff' : '#fff',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: '0.2s'
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '16px' }}>{servico.nome}</strong>
                <span style={{ fontSize: '13px', color: '#666' }}>🕒 {servico.duracao}</span>
              </div>
              <span style={{ fontWeight: 'bold', color: '#007bff' }}>R$ {servico.preco},00</span>
            </div>
          );
        })}
      </div>

      {servicoSelecionado && (
        <div style={{ marginTop: '30px' }}>
          <p style={{ fontWeight: 'bold' }}>3. Escolha o horário para {servicoSelecionado.nome}:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {horarios.map((horario) => {
              const ehEsteHorario = horarioSelecionado?.id === horario.id;
              return (
                <button
                  key={horario.id}
                  disabled={!horario.disponivel}
                  onClick={() => setHorarioSelecionado(horario)}
                  style={{
                    padding: '12px 5px',
                    border: ehEsteHorario ? '2px solid #007bff' : '1px solid #ccc',
                    borderRadius: '6px',
                    backgroundColor: !horario.disponivel
                      ? '#f5f5f5'
                      : ehEsteHorario
                        ? '#007bff'
                        : '#fff',
                    color: !horario.disponivel
                      ? '#aaa'
                      : ehEsteHorario
                        ? '#fff'
                        : '#333',
                    fontWeight: 'bold',
                    cursor: horario.disponivel ? 'pointer' : 'not-allowed',
                    textDecoration: horario.disponivel ? 'none' : 'line-through',
                    transition: '0.2s'
                  }}
                >
                  {horario.hora}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {horarioSelecionado && nomeCliente.trim() !== '' && (
        <button
          onClick={enviarPedidoWhatsapp}
          style={{
            marginTop: '30px',
            width: '100%',
            padding: '15px',
            backgroundColor: '#25D366',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          Confirmar Agendamento no WhatsApp 🚀
        </button>
      )}
    </div>
  );
}
