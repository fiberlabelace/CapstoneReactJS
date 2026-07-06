import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Movie from './movie'
import {Register, LogIn} from './movie/RegistLog'
import MovieDetail from './movie/movieDetail'
import MovieBooking from './movie/movieBooking'
import Admin from './movie/admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Movie />} />
      <Route path="/dangky" element={<Register />} />
      <Route path="/dangnhap" element={<LogIn />} />
      <Route path="/detail/:id" element={<MovieDetail />} />
      <Route path="/datve/:id" element={<MovieBooking />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
)