import { Footer } from './components/Footer.jsx';
import { Route, Routes } from 'react-router-dom';
import { Game } from './components/Game.jsx';
import { NotificationsContainer } from './components/NotificationsContainer';
import { Leaderboard } from './components/Leaderboard.jsx';
import { ScreenManager } from './components/ScreenManager.jsx';

function App() {
  return (
    <>
      <div className='grid grow items-center'>
        <Routes>
          <Route path='/' element={<ScreenManager />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Routes>
      </div>
      <Footer />
      <NotificationsContainer />
    </>
  );
}

export default App;
