import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className='flex flex-col md:flex-row items-start justify-center max-w-full'>
      <aside className='bg-obscure-500 w-full md:w-1/4 md:h-screen text-white p-5'>
        <button className='w-full border-white border-2 border-solid rounded p-2 flex items-center justify-start hover:bg-obscure-100'><FontAwesomeIcon icon={faPlus} className='pr-2' /> New Chat</button>
      </aside>
      <section className='bg-obscure-100 w-full md:w-3/4 md:h-screen p-5 text-white'>
      </section>
    </div>

  );
}

export default App;
