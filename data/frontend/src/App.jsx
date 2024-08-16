import { Route, Routes } from 'react-router-dom';
import { NotificationsContainer } from './components/NotificationsContainer';
import { Leaderboard } from './components/Leaderboard.jsx';
import { ScreenManager } from './components/ScreenManager.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ScreenManager />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>

      <NotificationsContainer />
    </>
  );
}

export default App;
