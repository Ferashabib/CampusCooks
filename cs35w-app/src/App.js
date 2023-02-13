import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Login from './pages/log_in';
import Upload from './pages/upload';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/log_in' element={<Login/>} />
          <Route path='/upload' element={<Upload/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
