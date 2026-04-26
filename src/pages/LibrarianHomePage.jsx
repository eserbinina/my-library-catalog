import { useState } from 'react'
import { Link } from 'react-router-dom'

function LibrarianHomePage() {
  const [books] = useState([
    { id: 1, title: "Война и мир", author: "Лев Толстой", electronic: true, paper: true, cover_url: null },
    { id: 2, title: "Преступление и наказание", author: "Федор Достоевский", electronic: true, paper: true, cover_url: null },
    { id: 3, title: "Мастер и Маргарита", author: "Михаил Булгаков", electronic: true, paper: true, cover_url: null },
    { id: 4, title: "Евгений Онегин", author: "Александр Пушкин", electronic: true, paper: true, cover_url: null },
    { id: 5, title: "Анна Каренина", author: "Лев Толстой", electronic: true, paper: true, cover_url: null },
    { id: 6, title: "Мертвые души", author: "Николай Гоголь", electronic: true, paper: false, cover_url: null },
    { id: 7, title: "Идиот", author: "Федор Достоевский", electronic: true, paper: true, cover_url: null },
    { id: 8, title: "Отцы и дети", author: "Иван Тургенев", electronic: true, paper: true, cover_url: null },
    { id: 9, title: "Горе от ума", author: "Александр Грибоедов", electronic: true, paper: true, cover_url: null },
    { id: 10, title: "Собачье сердце", author: "Михаил Булгаков", electronic: true, paper: true, cover_url: null }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMenuOpen, setShowMenuOpen] = useState(false)

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh' 
    }}>
      
      {/* ШАПКА С ИКОНКОЙ */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/images/profile-icon.png" 
            alt="Профиль" 
            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
          />
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>
              Электронный библиотечный каталог
            </h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
              Колледж ААСК
            </p>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/librarian/panel">
            <button style={{
              padding: '8px 20px',
              backgroundColor: '#f5f5f5',
              color: '#3636FF',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              👨‍💼 Панель библиотекаря
            </button>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('userRole')
              window.location.href = '/'
            }}
            style={{
              padding: '8px 20px',
              backgroundColor: '#3636FF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      {/* ОСНОВНОЕ СОДЕРЖАНИЕ */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Поиск по названию, автору или ключевым словам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h2 style={{ fontSize: '18px', color: '#333', margin: 0 }}>Найдено книг: {filteredBooks.length}</h2>
          
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenuOpen(!showMenuOpen)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3636FF',
                border: '1px solid #ffffff',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                minWidth: '100px',
                color: '#ffffff'
              }}
            >
              Показать {showMenuOpen ? '▲' : '▼'}
            </button>
            
            {showMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '5px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '100px'
              }}>
                {[6, 12, 18, 24].map(num => (
                  <div key={num} onClick={() => { setItemsPerPage(num); setCurrentPage(1); setShowMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: num !== 24 ? '1px solid #eee' : 'none', backgroundColor: itemsPerPage === num ? '#f0f0f0' : 'transparent' }}>{num}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {paginatedBooks.map(book => (
            <div key={book.id} style={{
              backgroundColor: '#fff',
              border: '1px solid #eee',
              borderRadius: '12px',
              padding: '18px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                width: '100%',
                height: '160px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #eee',
                overflow: 'hidden'
              }}>
                {book.cover_url ? (
                  <img src={book.cover_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '48px', color: '#ccc' }}>📖</span>
                )}
              </div>

              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>{book.title}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>{book.author}</p>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
                {book.electronic && <span style={{ color: '#4CAF50', fontSize: '13px' }}>[Электронная]</span>}
                {book.paper && <span style={{ color: '#2196F3', fontSize: '13px' }}>[Бумажная]</span>}
              </div>
              <Link to={`/book/${book.id}?from=librarian`} style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '8px 0',
                  width: '100%',
                  backgroundColor: '#3636FF',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#ffffff'
                }}>
                  Подробнее
                </button>
              </Link>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '40px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                color: currentPage === 1 ? '#ccc' : '#333',
                fontSize: '14px'
              }}
            >
              Предыдущая
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                return (
                  <button key={page} onClick={() => setCurrentPage(page)} style={{
                    minWidth: '40px',
                    padding: '8px 0',
                    backgroundColor: currentPage === page ? '#3636FF' : '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: currentPage === page ? '#fff' : '#333',
                    fontSize: '14px'
                  }}>
                    {page}
                  </button>
                )
              }
              if (page === currentPage - 3 || page === currentPage + 3) {
                return <span key={page} style={{ padding: '0 4px', color: '#999' }}>...</span>
              }
              return null
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                color: currentPage === totalPages ? '#ccc' : '#333',
                fontSize: '14px'
              }}
            >
              Следующая
            </button>
          </div>
        )}
      </div>

      {/* ФУТЕР */}
      <footer style={{ 
        backgroundColor: '#2c3e50', 
        color: '#fff', 
        padding: '40px 20px', 
        marginTop: '40px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/images/library-icon.png" 
              alt="Библиотека" 
              style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
            />
            <div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Библиотека ААСК</h3>
              <p style={{ margin: 0, color: '#ccc', fontSize: '13px' }}>Электронный библиотечный каталог<br />Алтайского архитектурно-строительного колледжа</p>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Навигация</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Главная</Link></li>
              <li><Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Каталог</Link></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Новинки</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>О библиотеке</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Информация</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Правила пользования</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Часы работы</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Контакты</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Помощь</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Контакты</h4>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>г. Барнаул, ул. Пример, 123</p>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Тел.: +7 (3852) 00-00-00</p>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Email: library@aasc.ru</p>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Пн-Пт: 9:00 - 18:00</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #1e2939', color: '#6a7282', fontSize: '14px' }}>
          © 2026 Колледж ААСК. Все права защищены
        </div>
      </footer>
    </div>
  )
}

export default LibrarianHomePage