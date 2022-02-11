import './App.css';
import React from 'react';
import NewForm from './Components/NewForm';
import HomePage from './Components/HomePage';
import ShowImg from './Components/ShowImg';
import EditForm from './Components/EditForm';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />}></Route>
        <Route exact path='/new' element={<NewForm />}></Route>
        <Route exact path='/show/:id' element={<ShowImg />}></Route>
        <Route exact path='/edit/:id' element={<EditForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
