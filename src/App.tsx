import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/join" element={<Join />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/volunteering" element={<Volunteering />} />
          {/* Activity feed — CMS-backed via Sanity */}
          <Route path="/activities" element={<Activities />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
