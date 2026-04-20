/**
 * App.tsx — Root component
 *
 * Sets up React Router with all page routes.
 * Each route maps to a page component in /src/pages/.
 *
 * Layout (Navbar + Footer) wraps all pages via the Layout component.
 */
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages share the same Layout (nav + footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/join" element={<Join />} />
          <Route path="/news" element={<News />} />
          {/* Dynamic route: /news/my-post-slug */}
          <Route path="/news/:slug" element={<NewsPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/volunteering" element={<Volunteering />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
