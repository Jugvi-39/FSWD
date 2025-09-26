import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MyCart from './components/MyCart';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mycart" element={<MyCart />} />
      </Routes>
    </div>
  );
}

export default App;
