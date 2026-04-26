import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function ManageCatalog() {
  const [books] = useState([
    { id: 1, name: "123456", bbk: "Y9246", title: "Толстой, Л. Н. Война и мир : драма. — 5-е изд. — Москва : Художественная литература, 2020. — 1274 с.", copies: 7, inCard: 2, inRegistry: 3 },
    { id: 2, name: "789012", bbk: "P30V866", title: "Марк Лутц. Основы программирования на Python : Санкт-Петербург : Диалектика, 2023", copies: 15, inCard: 0, inRegistry: 15 },
    { id: 3, name: "345678", bbk: "O1K05/123", title: "В.С. Шагарцев. Высшая математика : Москва : Юрайт, 2021", copies: 25, inCard: 10, inRegistry: 0 },
    { id: 4, name: "901234", bbk: "Y9245", title: "Г.А. Абрамова. Строительные материалы : Москва : Академия, 2022", copies: 36, inCard: 5, inRegistry: 8 },
    { id: 5, name: "567890", bbk: "SK1188", title: "К.К. Калашова. Архитектурное проектирование : Москва : Просвещение, 2023", copies: 18, inCard: 0, inRegistry: 18 },
    { id: 6, name: "234567", bbk: "U14112", title: "Романова, Д. З. Строительство по русскому языку : практическая статистика. — 3-е изд. — Москва : Авиакосм, 2019. — 384 с.", copies: 12, inCard: 8, inRegistry: 12 },
    { id: 7, name: "890123", bbk: "F211", title: "Пущин, А. С. Единый Октябрь : роман в стихах. — 7-е изд. — Санкт-Петербург : Айбура, 2021. — 416 с.", copies: 20, inCard: 10, inRegistry: 20 },
    { id: 8, name: "456789", bbk: "B631.3", title: "Коренев, В. И. История русской литературы XIX века : учебник. — 2-е изд. — Москва : Просвещение, 2020. — 608 с.", copies: 16, inCard: 5, inRegistry: 8 },
    { id: 9, name: "012345", bbk: "K2", title: "Достоевский, Ф. М. Преступление и наказание : роман. — 4-е изд. — Москва : АСТ, 2022. — 672 с.", copies: 14, inCard: 10, inRegistry: 14 },
    { id: 10, name: "678901", bbk: "C5", title: "Чижов, А. П. Рассказы о повести. — Москва : Эксмо, 2019. — 512 с.", copies: 16, inCard: 12, inRegistry: 16 },
    { id: 11, name: "234890", bbk: "T52", title: "Гоголь, Н. В. Мертвые души : роман. — 6-е изд. — Москва : Детская литература, 2020. — 368 с.", copies: 20, inCard: 10, inRegistry: 10 },
    { id: 12, name: "987234", bbk: "Q372", title: "Петров, А. А. Экономическая теория : учебник. — Москва : Юрайт, 2023. — 544 с.", copies: 10, inCard: 0, inRegistry: 10 },
    { id: 13, name: "890567", bbk: "P81", title: "Иванов, С. С. Проектирование задач и сооружений : учебное пособие. — Москва : Академия, 2021. — 432 с.", copies: 28, inCard: 20, inRegistry: 28 }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [showMenuOpen, setShowMenuOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)

  const [filterYearFrom, setFilterYearFrom] = useState('')
  const [filterYearTo, setFilterYearTo] = useState('')
  const [filterIsbn, setFilterIsbn] = useState('')
  const [filterBbk, setFilterBbk] = useState('')
  const [filterAvailable, setFilterAvailable] = useState(false)
  const [filterRubric, setFilterRubric] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [filterSeries, setFilterSeries] = useState('')

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.name.includes(searchTerm) ||
    book.bbk.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch(sortBy) {
      case 'name_asc': return a.name.localeCompare(b.name)
      case 'name_desc': return b.name.localeCompare(a.name)
      case 'title_asc': return a.title.localeCompare(b.title)
      case 'title_desc': return b.title.localeCompare(a.title)
      default: return 0
    }
  })

  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage)
  const paginatedBooks = sortedBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleView = (id) => {
  window.location.href = `/librarian/book-info/${id}`
}
  
  const handleEdit = (id) => {
    window.location.href = `/librarian/edit-book/${id}`
  }
  
  const handleDeleteClick = (book) => {
    setBookToDelete(book)
    setShowDeleteModal(true)
  }

  const handleSystemDelete = () => {
    console.log('Системное удаление книги:', bookToDelete)
    alert(`Книга "${bookToDelete.title}" удалена из каталога (системное удаление)`)
    setShowDeleteModal(false)
    setBookToDelete(null)
  }

  const handlePhysicalDelete = () => {
    console.log('Физическое удаление книги:', bookToDelete)
    alert(`Книга "${bookToDelete.title}" полностью удалена из базы (физическое удаление)`)
    setShowDeleteModal(false)
    setBookToDelete(null)
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/images/profile-icon.png" 
            alt="Профиль" 
            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
          />
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Управление каталогом</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <Link to="/librarian/panel" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px' }}>
          ← Назад к панели
        </Link>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Поиск по названию, автору, издателю, рубрике"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
              minWidth: '200px'
            }}
          />
          
          <button
            onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}
            style={{
              padding: '12px 20px',
              backgroundColor: advancedSearchOpen ? '#fff' : '#3636FF',
              border: advancedSearchOpen ? '1px solid #3636FF' : 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              color: advancedSearchOpen ? '#3636FF' : '#fff'
            }}
          >
            Расширенный поиск {advancedSearchOpen ? '▲' : '▼'}
          </button>

          <Link to="/librarian/add-book">
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#3636FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ fontSize: '18px' }}>+</span> Добавить книгу
            </button>
          </Link>
        </div>

        {advancedSearchOpen && (
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #eee',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Год издания (от — до)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" placeholder="От" value={filterYearFrom} onChange={(e) => setFilterYearFrom(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <input type="text" placeholder="До" value={filterYearTo} onChange={(e) => setFilterYearTo(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>ISBN</label>
                <input type="text" placeholder="978-5-..." value={filterIsbn} onChange={(e) => setFilterIsbn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>ББК</label>
                <input type="text" placeholder="У92-05" value={filterBbk} onChange={(e) => setFilterBbk(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Наличие</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" checked={filterAvailable} onChange={(e) => setFilterAvailable(e.target.checked)} /> Только в наличии
                </label>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Рубрики:</label>
                <input type="text" placeholder="Введите рубрику" value={filterRubric} onChange={(e) => setFilterRubric(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Персоналии:</label>
                <input type="text" placeholder="Введите персоналию" value={filterPerson} onChange={(e) => setFilterPerson(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Серия:</label>
                <input type="text" placeholder="Введите серию" value={filterSeries} onChange={(e) => setFilterSeries(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button style={{ padding: '8px 20px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Найти</button>
              <button onClick={() => {
                setFilterYearFrom(''); setFilterYearTo(''); setFilterIsbn(''); setFilterBbk(''); setFilterAvailable(false); setFilterRubric(''); setFilterPerson(''); setFilterSeries('')
              }} style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Очистить</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontSize: '18px', color: '#3636FF', margin: 0 }}>Найдено книг: {sortedBooks.length}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortMenuOpen(!sortMenuOpen)} style={{ padding: '10px 20px', backgroundColor: '#3636FF', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', minWidth: '120px', color: '#fff', border: 'none' }}>Сортировать {sortMenuOpen ? '▲' : '▼'}</button>
              {sortMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '200px' }}>
                  <div onClick={() => { setSortBy('relevance'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Релевантность</div>
                  <div onClick={() => { setSortBy('name_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Инв. номер (по возрастанию)</div>
                  <div onClick={() => { setSortBy('name_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Инв. номер (по убыванию)</div>
                  <div onClick={() => { setSortBy('title_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Название (А-Я)</div>
                  <div onClick={() => { setSortBy('title_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer' }}>Название (Я-А)</div>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenuOpen(!showMenuOpen)} style={{ padding: '10px 20px', backgroundColor: '#3636FF', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', minWidth: '100px', color: '#fff', border: 'none' }}>Показать {showMenuOpen ? '▲' : '▼'}</button>
              {showMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '100px' }}>
                  {[10, 20, 50, 100].map(num => <div key={num} onClick={() => { setItemsPerPage(num); setCurrentPage(1); setShowMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: num !== 100 ? '1px solid #eee' : 'none' }}>{num}</div>)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Имя позиции</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Индекс ББК</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Книга</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Экземпляры</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>В картотеке</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>В реестре</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Действие</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map(book => (
                <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>{book.name}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#3636FF', fontWeight: '500' }}>{book.bbk}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333', maxWidth: '400px' }}>{book.title}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(46, 125, 50, 0.15)',
                      color: '#2e7d32',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {book.copies} шт
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {book.inCard > 0 ? (
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(46, 125, 50, 0.15)',
                        color: '#2e7d32',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {book.inCard} шт
                      </span>
                    ) : '--'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {book.inRegistry > 0 ? (
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(46, 125, 50, 0.15)',
                        color: '#2e7d32',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {book.inRegistry} шт
                      </span>
                    ) : '--'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img 
                        src="/images/icon1.png" 
                        alt="Просмотр" 
                        onClick={() => handleView(book.id)}
                        style={{ width: '32px', height: '32px', cursor: 'pointer' }}
                      />
                      <img 
                        src="/images/icon2.png" 
                        alt="Редактировать" 
                        onClick={() => handleEdit(book.id)}
                        style={{ width: '32px', height: '32px', cursor: 'pointer' }}
                      />
                      <img 
                        src="/images/icon3.png" 
                        alt="Удалить" 
                        onClick={() => handleDeleteClick(book)}
                        style={{ width: '32px', height: '32px', cursor: 'pointer' }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>Предыдущая</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} style={{ padding: '8px 16px', backgroundColor: currentPage === page ? '#3636FF' : '#fff', color: currentPage === page ? '#fff' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>Следующая</button>
          </div>
        )}

      </div>

      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div><h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Библиотека ААСК</h3><p style={{ margin: 0, color: '#ccc', fontSize: '13px' }}>Электронный библиотечный каталог<br />Алтайского архитектурно-строительного колледжа</p></div>
          <div><h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Навигация</h4><ul style={{ listStyle: 'none', padding: 0 }}><li><Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Главная</Link></li><li><Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Каталог</Link></li><li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Новинки</a></li><li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>О библиотеке</a></li></ul></div>
          <div><h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Информация</h4><ul style={{ listStyle: 'none', padding: 0 }}><li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Правила пользования</a></li><li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Часы работы</a></li><li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Контакты</a></li><li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Помощь</a></li></ul></div>
          <div><h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Контакты</h4><p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>г. Барнаул, ул. Пример, 123</p><p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Тел.: +7 (3852) 00-00-00</p><p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Email: library@aasc.ru</p><p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Пн-Пт: 9:00 - 18:00</p></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #1e2939', color: '#6a7282', fontSize: '14px' }}>© 2026 Колледж ААСК. Все права защищены</div>
      </footer>

      {showDeleteModal && bookToDelete && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '90%',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 20px 0', color: '#d32f2f' }}>Удаление книги</h2>
            <div style={{ backgroundColor: '#f5f5f5', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>Книга:</span>
              <span style={{ fontSize: '14px', color: '#333', lineHeight: '1.4' }}>{bookToDelete.title}</span>
            </div>
            <div style={{ backgroundColor: '#ffebee', padding: '12px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <img src="/images/warning-icon.png" alt="Внимание" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              <span style={{ color: '#d32f2f', fontWeight: '500' }}>Внимание! Удаление книги необратимо</span>
            </div>
            <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#333' }}>Системное удаление</h3>
              <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0' }}>Книга будет удалена из каталога. История привязки к картотеке и реестру книг сохранится в системе.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/images/system-delete-icon.png" alt="Системное удаление" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                <button onClick={handleSystemDelete} style={{ padding: '8px 20px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Системное удаление</button>
              </div>
            </div>
            <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#333' }}>Физическое удаление</h3>
              <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0' }}>Книга будет удалена из базы данных безвозвратно. Доступно только если нет привязки к картотеке или реестру.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/images/physical-delete-icon.png" alt="Физическое удаление" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                <button onClick={handlePhysicalDelete} style={{ padding: '8px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Физическое удаление</button>
              </div>
            </div>
            <button onClick={() => { setShowDeleteModal(false); setBookToDelete(null) }} style={{ width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', marginTop: '8px' }}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCatalog