import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function CatalogPage() {
  const [books] = useState([
    { id: 1, title: "Война и мир", author: "Лев Толстой", electronic: true, paper: true, publisher: "Художественная литература", rubric: "Художественная литература", keywords: "роман, война", person: "Толстой Л.Н.", series: "Классика", year: 2020, isbn: "978-5-02-038267-1", available: true, branch: "Центральный", cover_url: null },
    { id: 2, title: "Преступление и наказание", author: "Федор Достоевский", electronic: true, paper: true, publisher: "Азбука", rubric: "Художественная литература", keywords: "роман, психология", person: "Достоевский Ф.М.", series: "Классика", year: 2021, isbn: "978-5-389-12345-6", available: true, branch: "Центральный", cover_url: null },
    { id: 3, title: "Мастер и Маргарита", author: "Михаил Булгаков", electronic: true, paper: true, publisher: "АСТ", rubric: "Художественная литература", keywords: "роман, мистика", person: "Булгаков М.А.", series: "Классика", year: 2019, isbn: "978-5-17-123456-7", available: false, branch: "Филиал на Правды", cover_url: null },
    { id: 4, title: "Евгений Онегин", author: "Александр Пушкин", electronic: true, paper: true, publisher: "Эксмо", rubric: "Художественная литература", keywords: "роман, поэзия", person: "Пушкин А.С.", series: "Классика", year: 2018, isbn: "978-5-04-123456-7", available: true, branch: "Центральный", cover_url: null },
    { id: 5, title: "Анна Каренина", author: "Лев Толстой", electronic: true, paper: true, publisher: "Художественная литература", rubric: "Художественная литература", keywords: "роман, любовь", person: "Толстой Л.Н.", series: "Классика", year: 2022, isbn: "978-5-02-038268-8", available: true, branch: "Филиал на Правды", cover_url: null },
    { id: 6, title: "Мертвые души", author: "Николай Гоголь", electronic: true, paper: false, publisher: "Эксмо", rubric: "Художественная литература", keywords: "поэма, сатира", person: "Гоголь Н.В.", series: "Классика", year: 2021, isbn: "978-5-04-123457-4", available: true, branch: "Центральный", cover_url: null }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterAvailable, setFilterAvailable] = useState(false)
  const [filterBranch, setFilterBranch] = useState('')
  const [filterKeywords, setFilterKeywords] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [filterSeries, setFilterSeries] = useState('')
  const [filterYearFrom, setFilterYearFrom] = useState('')
  const [filterYearTo, setFilterYearTo] = useState('')
  const [filterIsbn, setFilterIsbn] = useState('')

  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')

  const [showMenuOpen, setShowMenuOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBooks = books.filter(book => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const inTitle = book.title.toLowerCase().includes(searchLower)
      const inAuthor = book.author.toLowerCase().includes(searchLower)
      const inPublisher = book.publisher.toLowerCase().includes(searchLower)
      const inRubric = book.rubric.toLowerCase().includes(searchLower)
      if (!inTitle && !inAuthor && !inPublisher && !inRubric) return false
    }
    if (filterAvailable && !book.available) return false
    if (filterBranch && book.branch !== filterBranch) return false
    if (filterKeywords && !book.keywords.toLowerCase().includes(filterKeywords.toLowerCase())) return false
    if (filterPerson && !book.person.toLowerCase().includes(filterPerson.toLowerCase())) return false
    if (filterSeries && !book.series.toLowerCase().includes(filterSeries.toLowerCase())) return false
    if (filterYearFrom && book.year < parseInt(filterYearFrom)) return false
    if (filterYearTo && book.year > parseInt(filterYearTo)) return false
    if (filterIsbn && !book.isbn.includes(filterIsbn)) return false
    return true
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch(sortBy) {
      case 'title_asc': return a.title.localeCompare(b.title)
      case 'title_desc': return b.title.localeCompare(a.title)
      case 'year_asc': return a.year - b.year
      case 'year_desc': return b.year - a.year
      default: return 0
    }
  })

  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage)
  const paginatedBooks = sortedBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleClearFilters = () => {
    setSearchTerm('')
    setFilterAvailable(false)
    setFilterBranch('')
    setFilterKeywords('')
    setFilterPerson('')
    setFilterSeries('')
    setFilterYearFrom('')
    setFilterYearTo('')
    setFilterIsbn('')
  }

  const branches = [...new Set(books.map(b => b.branch))]

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh' 
    }}>
      
      <Header />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* ПОИСК + КНОПКА ФИЛЬТР */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '15px', 
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Поиск по названию, автору, издателю или рубрике..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
          
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{
              padding: '12px 20px',
              backgroundColor: filterOpen ? '#fff' : '#3636FF',
              border: filterOpen ? '1px solid #3636FF' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              color: filterOpen ? '#3636FF' : '#ffffff'
            }}
          >
            Фильтр {filterOpen ? '▲' : '▼'}
          </button>
        </div>

        {/* КОЛИЧЕСТВО КНИГ + КНОПКИ СОРТИРОВАТЬ И ПОКАЗАТЬ */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h2 style={{ fontSize: '18px', color: '#333', margin: 0 }}>Найдено книг: {sortedBooks.length}</h2>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Кнопка сортировки */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3636FF',
                  border: '1px solid #ffffff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  minWidth: '120px',
                  color: '#ffffff'
                }}
              >
                Сортировать {sortMenuOpen ? '▲' : '▼'}
              </button>
              
              {sortMenuOpen && (
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
                  minWidth: '200px'
                }}>
                  <div onClick={() => { setSortBy('relevance'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee', backgroundColor: sortBy === 'relevance' ? '#f0f0f0' : 'transparent' }}>Релевантность</div>
                  <div onClick={() => { setSortBy('title_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee', backgroundColor: sortBy === 'title_asc' ? '#f0f0f0' : 'transparent' }}>Заглавие А-Я</div>
                  <div onClick={() => { setSortBy('title_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee', backgroundColor: sortBy === 'title_desc' ? '#f0f0f0' : 'transparent' }}>Заглавие Я-А</div>
                  <div onClick={() => { setSortBy('year_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee', backgroundColor: sortBy === 'year_asc' ? '#f0f0f0' : 'transparent' }}>Год (сначала старые)</div>
                  <div onClick={() => { setSortBy('year_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', backgroundColor: sortBy === 'year_desc' ? '#f0f0f0' : 'transparent' }}>Год (сначала новые)</div>
                </div>
              )}
            </div>

            {/* Кнопка "Показать" */}
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
                  {[20, 40, 60, 80, 100].map(num => (
                    <div key={num} onClick={() => { setItemsPerPage(num); setCurrentPage(1); setShowMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: num !== 100 ? '1px solid #eee' : 'none', backgroundColor: itemsPerPage === num ? '#f0f0f0' : 'transparent' }}>{num}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* РАСШИРЕННЫЙ ПОИСК (ФИЛЬТРЫ) */}
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
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Только в наличии</label><input type="checkbox" checked={filterAvailable} onChange={(e) => setFilterAvailable(e.target.checked)} /></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Филиал</label><select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}><option value="">Все филиалы</option>{branches.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Ключевые слова</label><input type="text" placeholder="например: роман, классика" value={filterKeywords} onChange={(e) => setFilterKeywords(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} /></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Персоналии</label><input type="text" placeholder="например: Толстой Л.Н." value={filterPerson} onChange={(e) => setFilterPerson(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} /></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Серия</label><input type="text" placeholder="например: Классика" value={filterSeries} onChange={(e) => setFilterSeries(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} /></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>Год издания (от - до)</label><div style={{ display: 'flex', gap: '8px' }}><input type="number" placeholder="от" value={filterYearFrom} onChange={(e) => setFilterYearFrom(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} /><input type="number" placeholder="до" value={filterYearTo} onChange={(e) => setFilterYearTo(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} /></div></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: '400', fontSize: '13px', color: '#555' }}>ISBN</label><input type="text" placeholder="например: 978-5-02-038267-1" value={filterIsbn} onChange={(e) => setFilterIsbn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} /></div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button style={{ padding: '8px 25px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Найти</button>
              <button onClick={handleClearFilters} style={{ padding: '8px 25px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}>Очистить</button>
            </div>
          </div>
        )}

        {/* СЕТКА КАРТОЧЕК КНИГ */}
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
              {/* ===== ФОТО КНИГИ ===== */}
              {/* Если есть cover_url — показываем фото, если нет — рамка/иконка */}
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
                  <img 
                    src={book.cover_url} 
                    alt={book.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
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

        {/* ===== ПАГИНАЦИЯ (ПРЕДЫДУЩАЯ / ЦИФРЫ / СЛЕДУЮЩАЯ) ===== */}
        {totalPages > 0 && (
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
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      minWidth: '40px',
                      padding: '8px 0',
                      backgroundColor: currentPage === page ? '#3636FF' : '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: currentPage === page ? '#fff' : '#333',
                      fontSize: '14px'
                    }}
                  >
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
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Библиотека ААСК</h3>
            <p style={{ margin: 0, color: '#ccc', fontSize: '13px' }}>Электронный библиотечный каталог<br />Алтайского архитектурно-строительного колледжа</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Навигация</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Главная</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Каталог</a></li>
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
            <Link to="/login" style={{ color: '#99a1af', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginTop: '16px' }}>
              🔐 Вход для сотрудников
            </Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #1e2939', color: '#6a7282', fontSize: '14px' }}>
          © 2026 Колледж ААСК. Все права защищены
        </div>
      </footer>
    </div>
  )
}

export default CatalogPage