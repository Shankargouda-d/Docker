import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VisualLab from './pages/VisualLab';
import Advanced from './pages/Advanced';
import Explorer from './pages/Explorer';
import Masterclass from './pages/Masterclass';
import AboutFeedback from './pages/AboutFeedback';

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lab" element={<VisualLab />} />
                <Route path="/advanced" element={<Advanced />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/masterclass" element={<Masterclass />} />
                <Route path="/about" element={<AboutFeedback />} />
            </Routes>
        </>
    );
}
