import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import LibrarianHomePage from './pages/LibrarianHomePage'
import LibrarianPanel from './pages/LibrarianPanel'
import BookPagePaper from './pages/BookPagePaper'
import LoginPage from './pages/LoginPage'
import ManageCatalog from './pages/ManageCatalog'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import ProtectedRoute from './components/ProtectedRoute'
import BookInfo from './pages/BookInfo'
import BooksSupply from './pages/BooksSupply'
import DisposalActs from './pages/DisposalActs'
import CreateDisposalAct from './pages/CreateDisposalAct'
import ViewDisposalAct from './pages/ViewDisposalAct'
import EditDisposalAct from './pages/EditDisposalAct'
import ImportData from './pages/ImportData'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ОТКРЫТЫЕ СТРАНИЦЫ (без пароля) */}
        <Route path="/" element={<CatalogPage />} />
        <Route path="/book/:id" element={<BookPagePaper />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* ЗАКРЫТЫЕ СТРАНИЦЫ (только после входа библиотекаря) */}
        <Route path="/librarian" element={
          <ProtectedRoute allowedRole="librarian">
            <LibrarianHomePage />
          </ProtectedRoute>
        } />
        
        <Route path="/librarian/view-disposal-act/:id" element={
  <ProtectedRoute allowedRole="librarian">
    <ViewDisposalAct />
  </ProtectedRoute>
} />

<Route path="/librarian/edit-disposal-act/:id" element={
  <ProtectedRoute allowedRole="librarian">
    <EditDisposalAct />
  </ProtectedRoute>
} />

<Route path="/librarian/reports" element={
  <ProtectedRoute allowedRole="librarian">
    <Reports />
  </ProtectedRoute>
} />

<Route path="/librarian/import-data" element={
  <ProtectedRoute allowedRole="librarian">
    <ImportData />
  </ProtectedRoute>
} />

<Route path="/librarian/import-excel" element={
  <ProtectedRoute allowedRole="librarian">
    <ImportData />
  </ProtectedRoute>
} />

        <Route path="/librarian/panel" element={
          <ProtectedRoute allowedRole="librarian">
            <LibrarianPanel />
          </ProtectedRoute>
        } />
        
        <Route path="/librarian/manage-catalog" element={
          <ProtectedRoute allowedRole="librarian">
            <ManageCatalog />
          </ProtectedRoute>
        } />

        {/* СТРАНИЦА ДОБАВЛЕНИЯ КНИГИ */}
        <Route path="/librarian/add-book" element={
          <ProtectedRoute allowedRole="librarian">
            <AddBook />
          </ProtectedRoute>
        } />

        {/* СТРАНИЦА просмотра книги */}
        <Route path="/librarian/book-info/:id" element={
  <ProtectedRoute allowedRole="librarian">
    <BookInfo />
  </ProtectedRoute>
} />
{/* СТРАНИЦА картотека */}
<Route path="/librarian/books-supply" element={
  <ProtectedRoute allowedRole="librarian">
    <BooksSupply />
  </ProtectedRoute>
} />
<Route path="/librarian/disposal-acts" element={
  <ProtectedRoute allowedRole="librarian">
    <DisposalActs />
  </ProtectedRoute>
} />
<Route path="/librarian/create-disposal-act" element={
  <ProtectedRoute allowedRole="librarian">
    <CreateDisposalAct />
  </ProtectedRoute>
} />
        {/* СТРАНИЦА РЕДАКТИРОВАНИЯ КНИГИ */}
        <Route path="/librarian/edit-book/:id" element={
          <ProtectedRoute allowedRole="librarian">
            <EditBook />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}


export default App