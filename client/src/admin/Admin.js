import AdminLogin from './AdminLogin';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminClients from './adminDashboard/AdminClients';
import AdminDashboard from './adminDashboard/AdminDashboard';
import AdminMechanics from './adminDashboard/AdminMechanics';
import Aside from './adminDashboard/aside/Aside';
import AdminCars from './adminDashboard/AdminCars'
import AdminGuards from './adminDashboard/AdminGuards';
import AdminInventories from './adminDashboard/AdminInventories';

function Admin() {
  const [logged, setLogged] = useState(false)
  const [loading, setLoading]= useState(false)
  const [admin, setAdmin] = useState([])
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])

  // localStorage.clear()

  useEffect(() => {
    const data = localStorage.getItem('ADMIN')
    const login = localStorage.getItem('LOGGED')
    if (data && login) {
      setLogged(JSON.parse(login))
      setAdmin(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('LOGGED', JSON.stringify(logged))
    localStorage.setItem('ADMIN', JSON.stringify(admin))

  }, [logged,admin])
  
  function handleLogin(e) {
    setLoading(true)
    e.preventDefault()
    fetch('http://127.0.0.1:3000/admins/login', {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        full_name:fullName,
        password:password
      })
    }
    )
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setAdmin(data)
            setLoading(false)
            setLogged(true)
          } )
        } else {
          r.json().then((error) =>setError(error.errors))
        }
      }
      )
      
    e.target.reset()
    setFullName('')
    setPassword('')
  }

  return (
    <div>
   
      {logged ?
         <div className='grid grid-cols-7'>
        <BrowserRouter>
          <Aside />
          <Routes>
            <Route path='/'
              exact
              element={
                <div className='col-span-6'>
                  <AdminDashboard admin={admin} />
                </div>}
            />
            <Route path="/clients" element={
              <div className='col-span-6'>
                  <AdminClients admin={admin} />
              </div>}
            />
            
            <Route path="/mechanics" element={
              <div className='col-span-6'>
                  <AdminMechanics admin={admin} />
              </div>
            } />

            <Route path="/partsinstock" element={
              <div className='col-span-6'>
                <AdminInventories/>
              </div>
            } />

            <Route path="/carsingarage" element={
              <div className='col-span-6'>
                  <AdminCars admin={admin} />
              </div>
            } />
            
            <Route path="/guards" element={
              <div className='col-span-6'>
                  <AdminGuards/>
              </div>
            } />
            

          </Routes>
        </BrowserRouter>
      </div> 
        :
        <AdminLogin setFullName={setFullName} setPassword={setPassword} handleLogin={handleLogin} error={error} loading={loading} />
      }




    </div>
  );
}

export default Admin;
