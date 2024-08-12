import { Footer } from './components/Footer.jsx';
import { Home } from './components/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import { Game } from './components/Game.jsx';
import { NotificationsContainer } from './components/NotificationsContainer';
import { Leaderboard } from './components/Leaderboard.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <div className='container mx-auto flex flex-col items-center'>
              <Home />
            </div>
          }
        />
        <Route path='/create' element={<Game />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
      <Footer />
      <NotificationsContainer />
    </>
  );
}

export default App;
