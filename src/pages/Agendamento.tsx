import { useState, useEffect } from 'react';
import type { Servico, HorarioDisponivel } from './types/agendamento';
import ImagemFundo from '../assets/fundo.avif'
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
        // LINK CORRIGIDO E LIMPO SEM BARRAS INVERTIDAS:
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
      <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', maxWidth: '450px', margin: '0 auto', color: '#B48464', borderRadius: '15px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Agendamento Online</h1>
        <p style={{ textAlign: 'center', color: '#9CA3AF' }}>Carregando horários da nuvem...</p>
      </div>
    );
  }
  return (
    <div style={{
backgroundColor: "#0f0e0c",
      backgroundImage: `linear-gradient(rgba(15, 14, 12, 0.95), rgba(15, 14, 12, 0.97)), url("${ImagemFundo}")`,
      minHeight: '100vh',
      maxWidth: '450px',
      margin: '0 auto',
      padding: '24px 16px',
      fontFamily: 'sans-serif',
      color: '#ffffff',
      borderRadius: '15px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px', color: '#B48464' }}>Agendamento Online 🗓️</h1>

    
      <p style={{ fontWeight: 'bold', color: '#9CA3AF' }}>1. Digite seu nome:</p>
      <input
        type="text"
        placeholder="Digite seu nome completo..."
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '14px',
          borderRadius: '8px',
          border: '1px solid #2D2D2D',
          backgroundColor: '#1E1E1E',
          color: '#FFFFFF',
          outline: 'none',
          marginBottom: '20px'
        }}
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
      />

      {/* SEÇÃO DE SERVIÇOS */}
      <p style={{ fontWeight: 'bold', color: '#9CA3AF' }}>2. Selecione um serviço:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
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
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease-in-out',
                // AQUI APLICAMOS A COESÃO DE CORES DO TEMA ESCURO COM NEON CIANO:
                backgroundColor: '#1E1E1E',
                border: ehEsteServico ? '2px solid #462f0c' : '1px solid #2D2D2D',
                boxShadow: ehEsteServico ? '0 0 12px rgba(119, 83, 42, 0.4)' : 'none',
                color: '#ffffff'
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '16px' }}>{servico.nome}</strong>
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>🕒 {servico.duracao}</span>
              </div>
              <span style={{ fontWeight: 'bold', color: ehEsteServico ? '#462f0c' : '#ffffff' }}>
                R$ {servico.preco},00
              </span>
            </div>
          );
        })}
      </div>

      {/* SEÇÃO DE HORÁRIOS */}
      {servicoSelecionado && (
        <div style={{ marginTop: '30px' }}>
          <p style={{ fontWeight: 'bold', color: '#9CA3AF' }}>3. Escolha o horário para {servicoSelecionado.nome}:</p>
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
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    transition: '0.2s',
                    cursor: horario.disponivel ? 'pointer' : 'not-allowed',
                    
                    // CORES DOS HORÁRIOS EM MODO ESCURO E AZUL NEON:
                    border: ehEsteHorario ? '1px solid #4e3d23' : '1px solid #2D2D2D',
                    backgroundColor: !horario.disponivel
                      ? '#161616'
                      : ehEsteHorario
                        ? '#462f0c'
                        : '#1E1E1E',
                    color: !horario.disponivel
                      ? '#4B5563'
                      : ehEsteHorario
                        ? '#121212'
                        : '#FFFFFF',
                    textDecoration: horario.disponivel ? 'none' : 'line-through',
                    opacity: horario.disponivel ? 1 : 0.4,
                    boxShadow: ehEsteHorario ? '0 0 10px rgba(119, 83, 42, 0.4)' : 'none'
                  }}
                >
                  {horario.hora}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* BOTÃO DO WHATSAPP */}
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
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
            transition: '0.2s'
          }}
        >
          Confirmar Agendamento no WhatsApp 🚀
        </button>
      )}
    </div>
  );
}
