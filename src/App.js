import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import {NavBarPanel} from './components/NavBarPanel'; 
import Login from './components/Login';
import Products from './components/products'; 
import ProductDetail from './components/ProductDetail'; 
import { selectUser } from './features/userSlice'; 
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart'; {history} 


function App() {
  const user = useSelector(selectUser);

  const validUser = [
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '123',
    },
    {
      name: 'Admin2',
      email: 'admin2@gmail.com',
      password: '123',
    },
  ];

  const isValidUser = validUser.some(
    validUser =>
      validUser.name === user?.name &&
      validUser.email === user?.email &&
      validUser.password === user?.password 
  );                                                                  

  return (
    <Router>
      <div className="App">
        {true ? (
          <>
            <NavBarPanel />
            <Routes>
              <Route path="/" element={<Products />} /> 
              <Route path="/product/:id" element={<ProductDetail />} /> 
              <Route path='/cart' element={<Cart />} /> 
              <Route path="*" element={<Navigate to="/" />} /> 
            </Routes>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
