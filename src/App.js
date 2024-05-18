import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute'
import CreateConsumer from './pages/CreateConsumer'
import SearchByName from './pages/SearchByName'
import SearchByID from './pages/SearchByID'
import ShowAll from './pages/ShowAll'
import UpdateModal from './pages/UpdateModal'
import SearchByAadhaar from './pages/SearchByAadhaar'
import NotFound from './pages/NotFound'
import SearchByVillage from './pages/SearchByVillage'

const App = () => {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<CreateConsumer/>} />
            <Route path="/searchByName" element={<SearchByName/>} />
            <Route path="/searchByID" element={<SearchByID/>} />
            <Route path='/searchByAadhaar' element={<SearchByAadhaar/>}/>
            <Route path='/searchByVillage' element={<SearchByVillage/>}/>
            <Route path="/showAll" element={<ShowAll/>} />
            <Route path='/update/:id' element={<UpdateModal/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position='bottom-right'/>
      </Router>
    </div>
  )
}

export default App