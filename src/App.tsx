import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Agendamento from './pages/Agendamento.tsx';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        
       
        <Route path="/agendar" element={<Agendamento />} />
      </Routes>
    </BrowserRouter>
  );
}
