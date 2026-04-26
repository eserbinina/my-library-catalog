import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteDisposalActModal from '../components/DeleteDisposalActModal'

function DisposalActs() {
  const navigate = useNavigate()

  const [acts] = useState([
    { id: 1, actNumber: "AB-001/2025", date: "15.01.2025", status: "Проведен", book: "Толстой, Л. Н. Война и мир", reason: "Ветхий", quantity: 3 },
    { id: 2, actNumber: "AB-002/2025", date: "18.01.2025", status: "Редактируется", book: "Достоевский, Ф. М. Преступление и наказание", reason: "Утеря", quantity: 1 },
    { id: 3, actNumber: "AB-003/2025", date: "20.01.2025", status: "Черновик", book: "Булгаков, М. А. Мастер и Маргарита", reason: "Списание", quantity: 2 },
    { id: 4, actNumber: "AB-004/2025", date: "22.01.2025", status: "Проведен", book: "Гоголь, Н. В. Мертвые души", reason: "Ветхий", quantity: 1 }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState('date_desc')
  const [showMenuOpen, setShowMenuOpen] = useState(false)
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [actToDelete, setActToDelete] = useState(null)

  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('.')
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
    }
    return null
  }

  const filteredActs = acts.filter(act => {
    const matchesSearch = searchTerm === '' ||
      act.actNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const actDate = parseDate(act.date)
    const fromDate = dateFrom ? parseDate(dateFrom) : null
    const toDate = dateTo ? parseDate(dateTo) : null
    
    const matchesDateFrom = !fromDate || (actDate && actDate >= fromDate)
    const matchesDateTo = !toDate || (actDate && actDate <= toDate)
    const matchesStatus = statusFilter === '' || 
      act.status.toLowerCase().includes(statusFilter.toLowerCase())
    
    return matchesSearch && matchesDateFrom && matchesDateTo && matchesStatus
  })

  const sortedActs = [...filteredActs].sort((a, b) => {
    switch(sortBy) {
      case 'act_asc': return a.actNumber.localeCompare(b.actNumber)
      case 'act_desc': return b.actNumber.localeCompare(a.actNumber)
      case 'date_asc': return parseDate(a.date) - parseDate(b.date)
      case 'date_desc': return parseDate(b.date) - parseDate(a.date)
      default: return 0
    }
  })

  const totalPages = Math.ceil(sortedActs.length / itemsPerPage)
  const paginatedActs = sortedActs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAddAct = () => {
    navigate('/librarian/create-disposal-act')
  }
  
  const handleView = (id) => {
    navigate(`/librarian/view-disposal-act/${id}`)
  }
  
  const handleEdit = (id) => {
    navigate(`/librarian/edit-disposal-act/${id}`)
  }
  
  const handleDeleteClick = (act) => {
    setActToDelete(act)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = (mode) => {
    if (mode === 'system') {
      alert(`Акт ${actToDelete.actNumber} переведен в статус "Черновик"`)
    } else if (mode === 'physical') {
      alert(`Акт ${actToDelete.actNumber} полностью удален из базы данных`)
    }
    setShowDeleteModal(false)
    setActToDelete(null)
  }

  const resetAdvancedSearch = () => {
    setDateFrom('')
    setDateTo('')
    setStatusFilter('')
    setAdvancedSearchOpen(false)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Проведен': return { bg: '#e8f5e9', color: '#2e7d32' }
      case 'Редактируется': return { bg: '#fff3e0', color: '#ed6c02' }
      case 'Черновик': return { bg: '#f5f5f5', color: '#757575' }
      default: return { bg: '#f5f5f5', color: '#757575' }
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* ШАПКА */}
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
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Акты выбытия книг</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <Link to="/librarian/panel" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px' }}>
          ← Назад к панели
        </Link>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* РЕЕСТР АКТОВ */}
        <div style={{ 
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h2 style={{ fontSize: '24px', margin: 0, color: '#1a1a1a', fontWeight: '600' }}>Реестр актов выбытия</h2>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '14px' }}>Полный список всех оформленных актов</p>
          </div>
          <button
            onClick={handleAddAct}
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
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span> Создать акт
          </button>
        </div>

        {/* ПОИСК + РАСШИРЕННЫЙ ПОИСК */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Поиск по номеру акта, книге или причине..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}
            style={{
              padding: '12px 20px',
              backgroundColor: advancedSearchOpen ? '#3636FF' : '#f0f0f0',
              color: advancedSearchOpen ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}
          >
            Расширенный поиск {advancedSearchOpen ? '▲' : '▼'}
          </button>
        </div>

        {/* ВЫПАДАЮЩЕЕ МЕНЮ РАСШИРЕННОГО ПОИСКА */}
        {advancedSearchOpen && (
          <div style={{
            marginBottom: '20px',
            padding: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#333' }}>Дата</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="ДД.ММ.ГГГГ"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    style={{ flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                  />
                  <span style={{ color: '#666' }}>—</span>
                  <input
                    type="text"
                    placeholder="ДД.ММ.ГГГГ"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    style={{ flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#333' }}>Статус</label>
                <input
                  type="text"
                  placeholder="Введите статус..."
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button onClick={resetAdvancedSearch} style={{ padding: '8px 16px', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Сбросить</button>
              <button onClick={() => setAdvancedSearchOpen(false)} style={{ padding: '8px 16px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Применить</button>
            </div>
          </div>
        )}

        {/* СОРТИРОВКА И ПАГИНАЦИЯ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontSize: '18px', color: '#3636FF', margin: 0 }}>Найдено актов: {sortedActs.length}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortMenuOpen(!sortMenuOpen)} style={{ padding: '10px 20px', backgroundColor: '#3636FF', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', minWidth: '120px', color: '#fff', border: 'none' }}>Сортировать {sortMenuOpen ? '▲' : '▼'}</button>
              {sortMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '200px' }}>
                  <div onClick={() => { setSortBy('act_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Номер акта (по возрастанию)</div>
                  <div onClick={() => { setSortBy('act_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Номер акта (по убыванию)</div>
                  <div onClick={() => { setSortBy('date_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Дата (сначала старые)</div>
                  <div onClick={() => { setSortBy('date_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer' }}>Дата (сначала новые)</div>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenuOpen(!showMenuOpen)} style={{ padding: '10px 20px', backgroundColor: '#3636FF', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', minWidth: '100px', color: '#fff', border: 'none' }}>Показать {showMenuOpen ? '▲' : '▼'}</button>
              {showMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '100px' }}>
                  {[10, 20, 50, 100].map(num => (
                    <div key={num} onClick={() => { setItemsPerPage(num); setCurrentPage(1); setShowMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: num !== 100 ? '1px solid #eee' : 'none' }}>{num}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ТАБЛИЦА */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '500' }}>Номер</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '500' }}>Дата акта</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '500' }}>Статус акта</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#666', fontSize: '13px', fontWeight: '500' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedActs.map(act => {
                const statusStyle = getStatusColor(act.status)
                return (
                  <tr key={act.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333' }}>{act.actNumber}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333' }}>{act.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color
                      }}>
                        {act.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src="/images/icon1.png" 
                          alt="Просмотр" 
                          onClick={() => handleView(act.id)}
                          style={{ width: '28px', height: '28px', cursor: 'pointer' }}
                        />
                        <img 
                          src="/images/icon2.png" 
                          alt="Редактировать" 
                          onClick={() => handleEdit(act.id)}
                          style={{ width: '28px', height: '28px', cursor: 'pointer' }}
                        />
                        <img 
                          src="/images/icon3.png" 
                          alt="Удалить" 
                          onClick={() => handleDeleteClick(act)}
                          style={{ width: '28px', height: '28px', cursor: 'pointer' }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* ПАГИНАЦИЯ (нижняя) */}
        {sortedActs.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Показано {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, sortedActs.length)} из {sortedActs.length}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#ccc' : '#333' }}>Предыдущая</button>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#ccc' : '#333' }}>Следующая</button>
            </div>
          </div>
        )}
      </div>

      {/* ФУТЕР */}
      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '40px 20px', marginTop: '40px' }}>
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
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #1e2939', color: '#6a7282', fontSize: '14px' }}>
          © 2026 Колледж ААСК. Все права защищены
        </div>
      </footer>

      {/* МОДАЛЬНОЕ ОКНО УДАЛЕНИЯ */}
      {showDeleteModal && actToDelete && (
        <DeleteDisposalActModal 
          act={actToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}

export default DisposalActs