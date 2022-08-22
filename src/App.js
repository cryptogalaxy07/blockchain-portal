import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './layout/Landing';
import Connect from './layout/Connect';

// import your route components too

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/connect' element={<Connect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
