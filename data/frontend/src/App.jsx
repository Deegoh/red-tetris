import { Footer } from './components/Footer.jsx';
import { Home } from './components/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import { Game } from './components/Game.jsx';
import { NotificationsContainer } from './components/NotificationsContainer';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Game />} />
      </Routes>
      <Footer />
      <NotificationsContainer />
    </>
  );
}

export default App;
