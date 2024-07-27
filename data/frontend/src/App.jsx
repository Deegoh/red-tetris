import React from "react";
import {Footer} from "./components/footer.jsx";
import {Home} from "./components/home.jsx";

import {EntryModal} from './components/EntryModal'
import {NotificationsContainer} from './components/NotificationsContainer'


function App() {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center">
        <EntryModal/>
        <Home/>
        <Footer/>
      </div>
      <NotificationsContainer/>
    </>
  )
}

export default App
