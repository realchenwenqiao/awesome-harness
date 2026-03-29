import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;
