import { Route, Routes } from 'react-router-dom';
import { DealsDash } from './components/DealsDash';
import { Navigation } from './components/Navigation';
import { CryptoExchange } from './pages/CryptoExchange';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<DealsDash></DealsDash>} />
        <Route path='/exchange' element={<CryptoExchange></CryptoExchange>} />
      </Routes>
    </>
  );
}

export default App;
