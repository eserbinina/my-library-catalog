import { useState } from 'react'
import { Link } from 'react-router-dom'

function CatalogPage() {
  const [books] = useState([
    { id: 1, title: "Война и мир", author: "Лев Толстой", electronic: true, paper: true },
    { id: 2, title: "Преступление и наказание", author: "Федор Достоевский", electronic: true, paper: true },
    { id: 3, title: "Мастер и Маргарита", author: "Михаил Булгаков", electronic: true, paper: true },
    { id: 4, title: "Евгений Онегин", author: "Александр Пушкин", electronic: true, paper: true },
    { id: 5, title: "Анна Каренина", author: "Лев Толстой", electronic: true, paper: true },
    { id: 6, title: "Преступление и наказание", author: "Федор Достоевский", electronic: true, paper: true },
    { id: 7, title: "Мастер и Маргарита", author: "Михаил Булгаков", electronic: true, paper: true },
    { id: 8, title: "Евгений Онегин", author: "Александр Пушкин", electronic: true, paper: true },
    { id: 9, title: "Анна Каренина", author: "Лев Толстой", electronic: true, paper: true },
    { id: 10, title: "Мертвые души", author: "Николай Гоголь", electronic: true, paper: false }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  const [authorFilter, setAuthorFilter] = useState('')
  const [publisherFilter, setPublisherFilter] = useState('')
  const [rubricFilter, setRubricFilter] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [titleFilter, setTitleFilter] = useState('')
  const [yearFilter, setYearFilter] = useState('')
  const [keywordsFilter, setKeywordsFilter] = useState('')
  const [versionFilter, setVersionFilter] = useState('')

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleClearFilters = () => {
    setAuthorFilter('')
    setPublisherFilter('')
    setRubricFilter('')
    setPersonFilter('')
    setTitleFilter('')
    setYearFilter('')
    setKeywordsFilter('')
    setVersionFilter('')
  }

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh' 
    }}>
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ — КНОПКА ВХОДА ВЕДЁТ НА /login */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: '8px 20px',
            backgroundColor: '#3636FF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Вход в аккаунт
          </button>
        </Link>
      </div>

      {/* ОСНОВНОЕ СОДЕРЖАНИЕ */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: '28px', margin: 0, color: '#333' }}>Электронный библиотечный каталог</h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Колледж ААСК</p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '25px', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Поиск по названию, автору или ключевым словам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 3,
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              minWidth: '200px'
            }}
          />
          
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{
              flex: 1,
              padding: '12px 20px',
              backgroundColor: filterOpen ? '#fff' : '#3636FF',
              border: filterOpen ? '1px solid #3636FF' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              minWidth: '100px',
              color: filterOpen ? '#3636FF' : '#ffffff'
            }}
          >
            Фильтр
          </button>
          
          <button style={{
            flex: 1,
            padding: '12px 20px',
            backgroundColor: '#3636FF',
            border: '1px solid #ffffff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            minWidth: '120px',
            color: '#ffffff'
          }}>
            Сортировать...
          </button>
        </div>

        {filterOpen && (
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #eee',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 15px 0', color: '#333' }}>Расширенный поиск</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Автор</label>
                <input type="text" placeholder="Например: Лев Толстой" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Издательство</label>
                <input type="text" placeholder="Например: АСТ" value={publisherFilter} onChange={(e) => setPublisherFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Основная рубрика</label>
                <input type="text" placeholder="Например: Художественная литература" value={rubricFilter} onChange={(e) => setRubricFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Персоналия</label>
                <input type="text" placeholder="Например: Лев Николаевич Толстой" value={personFilter} onChange={(e) => setPersonFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Основное заглавие</label>
                <input type="text" placeholder="Например: Название книги" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Дата издания</label>
                <input type="text" placeholder="Например: 2020" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Ключевые слова</label>
                <input type="text" placeholder="Например: роман, классика" value={keywordsFilter} onChange={(e) => setKeywordsFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Доступная версия</label>
                <input type="text" placeholder="Например: Электронная, Бумажная" value={versionFilter} onChange={(e) => setVersionFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button style={{ padding: '8px 25px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Найти</button>
              <button onClick={handleClearFilters} style={{ padding: '8px 25px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}>Очистить</button>
            </div>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', color: '#333' }}>Найдено книг: {filteredBooks.length}</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredBooks.map(book => (
            <div key={book.id} style={{
              backgroundColor: '#fff',
              border: '1px solid #eee',
              borderRadius: '12px',
              padding: '18px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>{book.title}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>{book.author}</p>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
                {book.electronic && <span style={{ color: '#4CAF50', fontSize: '13px' }}>[Электронная]</span>}
                {book.paper && <span style={{ color: '#2196F3', fontSize: '13px' }}>[Бумажная]</span>}
              </div>
              <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
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
      </div>

      <footer style={{ 
        backgroundColor: '#2c3e50', 
        color: '#fff', 
        padding: '40px 20px', 
        marginTop: '40px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Библиотека ААСК</h3>
            <p style={{ margin: 0, color: '#ccc', fontSize: '13px' }}>Электронный библиотечный каталог<br />Алтайского архитектурно-строительного колледжа</p>
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
      </footer>
    </div>
  )
}

export default CatalogPage