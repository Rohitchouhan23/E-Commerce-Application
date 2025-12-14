import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return (
    <>
        <div className="min-h-screen flex flex-col">
          <Header/>
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
              </Routes>
            </main>
            <Footer/>
        </div>
    </>
  )
}

export default App