import React from "react";
import {Footer} from "./components/Footer.jsx";
import {Home} from "./components/Home.jsx";
import {Route, Routes} from "react-router-dom";
import {Game} from "./components/Game.jsx";
import {AdminTools} from "./components/adminTools/AdminTools.jsx";
import {NotificationsContainer} from './components/NotificationsContainer'


function App() {
  return (
    <>
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
      <AdminTools/>
      <NotificationsContainer/>
    </>
  )
}

export default App
