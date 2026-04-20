import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import LibrarianHomePage from './pages/LibrarianHomePage'
import BookPagePaper from './pages/BookPagePaper'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/librarian" element={<LibrarianHomePage />} />
        <Route path="/book/:id" element={<BookPagePaper />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App