import { CryptoContextProvider } from './context/crypto-context';
import { AppLayout } from './components/Layout/AppLayout';

import './App.css'






 const App = () => {


  return (
  <CryptoContextProvider>

  <AppLayout/>
  </CryptoContextProvider>

  )
}


export default App