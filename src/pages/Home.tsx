import { useNavigate } from 'react-router-dom';
import imagemFundo from '../assets/fundo.avif';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#0F0E0C',   
      backgroundImage: `linear-gradient(rgba(15, 14, 12, 0.85), rgba(15, 14, 12, 0.95)), url("${imagemFundo}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      width: '100vw',            
      overflowX: 'hidden',       
      padding: '40px max(20px, 5%)',
      fontFamily: 'sans-serif',
      color: '#FFFFFF',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        maxWidth: '1200px',
        marginBottom: '40px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <strong style={{ letterSpacing: '2px', fontSize: '20px', color: '#B48464' }}>BARBER</strong>
          <span style={{ fontSize: '11px', color: '#9CA3AF', letterSpacing: '1px' }}>SHOP</span>
        </div>
        <button 
          onClick={() => navigate('/agendar')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#B48464', 
            color: '#0F0E0C', 
            border: 'none', 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            fontSize: '13px', 
            cursor: 'pointer',
            transition: '0.2s'
          }}
        >
          AGENDAR
        </button>
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        gap: '24px', 
        marginBottom: '60px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <h1 style={{ 
          fontSize: 'calc(28px + 2vw)', 
          fontWeight: 'bold', 
          lineHeight: '1.1', 
          margin: 0,
          fontFamily: 'Georgia, serif',
          maxWidth: '650px'
        }}>
          A arte do <br />
          <span style={{ color: '#B48464' }}>corte perfeito.</span>
        </h1>

        <p style={{ 
          color: '#9CA3AF', 
          fontSize: 'calc(14px + 0.1vw)', 
          lineHeight: '1.6', 
          margin: 0, 
          maxWidth: '500px' 
        }}>
          Barbearia premium no coração de Palmeira. Cada detalhe cuidado por profissionais — cortes clássicos, barba perfeita e uma experiência única.
        </p>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '16px', 
          marginTop: '10px',
          width: '100%',
          maxWidth: '450px'
        }}>
          <button
            onClick={() => navigate('/agendar')}
            style={{
              flex: '1 1 200px',
              padding: '18px',
              backgroundColor: '#B48464',
              color: '#0F0E0C',
              border: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            AGENDAR HORÁRIO
          </button>

          <button
            onClick={() => navigate('/agendar')}
            style={{
              flex: '1 1 200px',
              padding: '18px',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid #B48464',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            VER SERVIÇOS
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        borderTop: '1px solid #222', 
        paddingTop: '30px',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '32px', color: '#B48464', fontWeight: 'bold' }}>16+</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#6B7280', letterSpacing: '1px', marginTop: '4px' }}>ANOS DE EXP.</p>
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '32px', color: '#B48464', fontWeight: 'bold' }}>4.800+</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#6B7280', letterSpacing: '1px', marginTop: '4px' }}>CLIENTES FIÉIS</p>
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '32px', color: '#B48464', fontWeight: 'bold' }}>8</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#6B7280', letterSpacing: '1px', marginTop: '4px' }}>ESPECIALISTAS</p>
        </div>
      </div>
    </div>
  );
}
