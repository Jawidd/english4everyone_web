import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Classes from './pages/Classes'
import Join from './pages/Join'
import News from './pages/News'
import NewsPost from './pages/NewsPost'
import Contact from './pages/Contact'
import Volunteering from './pages/Volunteering'
import Activities from './pages/Activities'
import ArcSocial from './pages/ArcSocial'
import site from '../site.json'

const enabled = (path: string) => site.navigation.find((n) => n.to === path)?.enabled !== false

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about"        element={enabled('/about')        ? <About />        : <Navigate to="/" replace />} />
          <Route path="/classes"      element={enabled('/classes')      ? <Classes />      : <Navigate to="/" replace />} />
          <Route path="/join"         element={enabled('/join')         ? <Join />         : <Navigate to="/" replace />} />
          <Route path="/news"         element={enabled('/news')         ? <News />         : <Navigate to="/" replace />} />
          <Route path="/news/:slug"   element={enabled('/news')         ? <NewsPost />     : <Navigate to="/" replace />} />
          <Route path="/contact"      element={enabled('/contact')      ? <Contact />      : <Navigate to="/" replace />} />
          <Route path="/volunteering" element={enabled('/volunteering') ? <Volunteering /> : <Navigate to="/" replace />} />
          <Route path="/activities"   element={enabled('/activities')   ? <Activities />   : <Navigate to="/" replace />} />
          <Route path="/arc-social"   element={enabled('/arc-social')   ? <ArcSocial />    : <Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
