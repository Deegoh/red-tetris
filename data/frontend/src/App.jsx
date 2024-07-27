import React from "react";
import {Footer} from "./components/footer.jsx";
import {Home} from "./components/home.jsx";
import {Route, Routes} from "react-router-dom";
import {Game} from "./components/game.jsx";

import {EntryModal} from './components/EntryModal'
import {NotificationsContainer} from './components/NotificationsContainer'


function App() {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center">
        <EntryModal/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<Game/>}/>
          <Route path="/join" element={<Home/>}/>
        </Routes>
        <Footer/>
      </div>
      <NotificationsContainer/>
    </>
  )
}

export default App
