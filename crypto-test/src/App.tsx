import { Route, Routes } from 'react-router-dom';
import { DealsDash } from './components/DealsDash';
import { EmptyComponent } from './components/EmptyComponent';
import { ExchangeForm } from './components/ExchangeForm';
import { Navigation } from './components/Navigation';
import { CryptoExchange } from './pages/CryptoExchange';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={< ExchangeForm/>} />
        <Route path='/deals' element={<DealsDash></DealsDash>} />
        <Route path='/exchange' element={<ExchangeForm></ExchangeForm>} />
      </Routes>
    </>
  );
}

export default App;
