import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import MainPage from './pages/MainPage/mainPage';
import VideoDetailsPage from './pages/VideoPage/VideoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/video/:id" element={<VideoDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
