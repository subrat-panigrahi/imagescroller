import logo from './logo.svg';
import './App.css';
import Pageontainer from './components/PageContainer';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{console.log('brah')},[]);
  return (
    <div className="App">
      <header className="App-header">
      <Pageontainer />
      </header>
    </div>
  );
}

export default App;
