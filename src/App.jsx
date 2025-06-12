import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Details from './components/Details';
import Myads from './components/Myads'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
        {/* <Route path='/myads' element={<Myads />} /> */}
        
          <Route element={<ProtectedRoute />}>
        <Route path="/myads" element={<Myads />} />
        {/* <Route path="/sell" element={<Sell />} /> */}
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
