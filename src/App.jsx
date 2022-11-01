import React from 'react'
import Header from './components/Header'
import './css/App.css'
import Home from './pages/Home'
import Details from './pages/Details'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  )
}

export default App
