import * as React from "react";

function App() {
  return (
    <div className="container mx-auto flex flex-col items-center">

      <div className="p-8 shadow-xl bg-gray-300 rounded text-center">
        <h1 className="py-4">Red Tetris</h1>
        <h2 className="pb-12">New way to play Tetris</h2>
        <button
          className="rounded shadow-lg shadow-purple-500/40 bg-purple-500 hover:bg-purple-700 hover:shadow-purple-700/40 text-white px-4 py-2">
          Play
        </button>
      </div>
      <footer className="text-white absolute inset-x-0 bottom-8 flex flex-col items-center">
        <small>Made with ❤️ by <a
          className="text-blue-300 underline"
          href="https://profile.intra.42.fr/users/jjaqueme">jjaqueme</a> && <a
          className="text-blue-300 underline" href="https://profile.intra.42.fr/users/tpinto-m">tpinto-m</a>
        </small>
        <small>
          <a className="text-blue-300 underline" href="https://github.com/Deegoh/red-tetris">Github Project</a>
        </small>
      </footer>

    </div>
  )
}

export default App
