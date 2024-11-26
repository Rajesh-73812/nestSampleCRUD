import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

import Create from './crud/Create'
import Home from './Home'
import Dashboard from './crud/Dashboard'
import Edit from './crud/Edit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/edit/:id' element={<Edit />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
