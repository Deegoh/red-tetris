import React from "react";
import {Footer} from "./components/Footer.jsx";
import {Home} from "./components/Home.jsx";
import {Route, Routes} from "react-router-dom";
import {Game} from "./components/Game.jsx";

import {EntryModal} from './components/EntryModal'
import {NotificationsContainer} from './components/NotificationsContainer'


function App() {
  return (
    <>
      <EntryModal/>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto flex flex-col items-center">
            <Home/>
            <Footer/>
          </div>
        }/>
        <Route path="/create" element={<Game/>}/>
        <Route path="/join" element={<Home/>}/>
      </Routes>
      <NotificationsContainer/>
    </>
  )
}

export default App
