import { useState } from 'react'
import { Link } from 'react-router-dom'
import AddSupplyModal from '../components/AddSupplyModal'
import EditSupplyModal from '../components/EditSupplyModal'
import DeleteSupplyModal from '../components/DeleteSupplyModal'

function BooksSupply() {
  const [supplyData] = useState([
    { 
      id: 1,
      specialty: "08.02.01",
      specialtyName: "Строительство и эксплуатация зданий и сооружений",
      grade: "11кл",
      yearStart: "2025-2026",
      cycle: "ОУДБ.01",
      subject: "Русский язык",
      book: "Рудяков А.Н., Русский язык. Базовый уровень. Учебник для СПО. В 2 частях. Ч. 1 - Москва: Просвещение, 2025",
      students: 25,
      copies: 28,
      percentage: 112,
      status: "active",
      publishYear: "2025",
      isbn: "978-5-09-123456-7"
    },
    { 
      id: 2,
      specialty: "08.02.01",
      specialtyName: "Строительство и эксплуатация зданий и сооружений",
      grade: "11кл",
      yearStart: "2025-2026",
      cycle: "ОУДБ.01",
      subject: "Литература",
      book: "Лебедев Ю.В., Литература. Учебник для СПО. В 2 частях. Ч. 1 - Москва: Просвещение, 2024",
      students: 25,
      copies: 30,
      percentage: 120,
      status: "active",
      publishYear: "2024",
      isbn: "978-5-09-123456-8"
    },
    { 
      id: 3,
      specialty: "07.02.01",
      specialtyName: "Архитектура",
      grade: "9кл",
      yearStart: "2024-2027",
      cycle: "ОУДБ.01",
      subject: "Русский язык",
      book: "Рудяков А.Н., Русский язык. Базовый уровень. Учебник для СПО. В 2 частях. Ч. 1 - Москва: Просвещение, 2023",
      students: 20,
      copies: 28,
      percentage: 140,
      status: "active",
      publishYear: "2023",
      isbn: "978-5-09-123456-9"
    },
    { 
      id: 4,
      specialty: "07.02.01",
      specialtyName: "Архитектура",
      grade: "9кл",
      yearStart: "2024-2027",
      cycle: "ОУДБ.01",
      subject: "Литература",
      book: "Лебедев Ю.В., Литература. Учебник для СПО. В 2 частях. Ч. 1 - Москва: Просвещение, 2023",
      students: 25,
      copies: 20,
      percentage: 80,
      status: "inactive",
      publishYear: "2023",
      isbn: "978-5-09-123456-0"
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [showMenuOpen, setShowMenuOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
const [editData, setEditData] = useState(null)
const [showDeleteModal, setShowDeleteModal] = useState(false)
const [supplyToDelete, setSupplyToDelete] = useState(null)

  const [filterSubject, setFilterSubject] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('')
  const [filterCycle, setFilterCycle] = useState('')
  const [filterPeriodFrom, setFilterPeriodFrom] = useState('')
  const [filterPeriodTo, setFilterPeriodTo] = useState('')
  const [filterPublishYearFrom, setFilterPublishYearFrom] = useState('')
  const [filterPublishYearTo, setFilterPublishYearTo] = useState('')
  const [filterIsbn, setFilterIsbn] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredData = supplyData.filter(item => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchSpecialty = item.specialty.includes(searchTerm) || item.specialtyName.toLowerCase().includes(searchLower)
      const matchSubject = item.subject.toLowerCase().includes(searchLower)
      const matchBook = item.book.toLowerCase().includes(searchLower)
      if (!matchSpecialty && !matchSubject && !matchBook) return false
    }
    
    if (statusFilter !== 'all' && item.status !== statusFilter) return false
    
    if (filterSubject && !item.subject.toLowerCase().includes(filterSubject.toLowerCase())) return false
    if (filterSpecialty && !item.specialty.toLowerCase().includes(filterSpecialty.toLowerCase()) && !item.specialtyName.toLowerCase().includes(filterSpecialty.toLowerCase())) return false
    if (filterCycle && !item.cycle.toLowerCase().includes(filterCycle.toLowerCase())) return false
    if (filterPeriodFrom && item.yearStart < filterPeriodFrom) return false
    if (filterPeriodTo && item.yearStart > filterPeriodTo) return false
    if (filterPublishYearFrom && item.publishYear < filterPublishYearFrom) return false
    if (filterPublishYearTo && item.publishYear > filterPublishYearTo) return false
    if (filterIsbn && !item.isbn.includes(filterIsbn)) return false
    
    return true
  })

  const sortedData = [...filteredData].sort((a, b) => {
    switch(sortBy) {
      case 'specialty_asc': return a.specialty.localeCompare(b.specialty)
      case 'specialty_desc': return b.specialty.localeCompare(a.specialty)
      case 'percentage_asc': return a.percentage - b.percentage
      case 'percentage_desc': return b.percentage - a.percentage
      default: return 0
    }
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getPercentageColor = (percentage) => {
    if (percentage >= 100) return '#2e7d32'
    if (percentage >= 80) return '#ff9800'
    return '#d32f2f'
  }

const handleEdit = (id) => {
  // ВРЕМЕННЫЕ ДАННЫЕ ДЛЯ РЕДАКТИРОВАНИЯ (потом будут с сервера)
  setEditData({
    id: id,
    specialty: "08.02.01 Строительство и эксплуатация зданий и сооружений",
    cycle: "ОУДБ.01",
    subject: "Русский язык",
    academicYear: "2025-2026",
    educationLevel: "11 класс",
    selectedBooks: [
      { id: 1, title: "Рудяков А.Н., Русский язык. Базовый уровень. Учебник для СПО. В 2 частях. Ч. 1 - Москва: Просвещение, 2025", copies: 3 }
    ]
  })
  setShowEditModal(true)
}

  const handleDelete = (supply) => {
  setSupplyToDelete(supply)
  setShowDeleteModal(true)
}
const handleConfirmDelete = (type, supply) => {
  console.log(`Удаление записи (${type}):`, supply)
  alert(`Запись удалена (заглушка)`)
  setShowDeleteModal(false)
  setSupplyToDelete(null)
}

    const handleAddRecord = () => {
    setShowAddModal(true)
  
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setFilterSubject('')
    setFilterSpecialty('')
    setFilterCycle('')
    setFilterPeriodFrom('')
    setFilterPeriodTo('')
    setFilterPublishYearFrom('')
    setFilterPublishYearTo('')
    setFilterIsbn('')
    setStatusFilter('all')
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
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Картотека книгообеспеченности</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <Link to="/librarian/panel" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px' }}>
          ← Назад к панели
        </Link>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={handleAddRecord}
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
            <span style={{ fontSize: '18px' }}>+</span> Добавить запись
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Поиск по названию, автору, издательству, предмету, специальности"
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
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Статус карточки</label>
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setStatusMenuOpen(!statusMenuOpen)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px'
                    }}
                  >
                    {statusFilter === 'all' ? 'Все' : statusFilter === 'active' ? 'Активные' : 'Неактивные'}
                    <span>{statusMenuOpen ? '▲' : '▼'}</span>
                  </button>
                  {statusMenuOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: '5px',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      zIndex: 1000,
                      overflow: 'hidden'
                    }}>
                      <div onClick={() => { setStatusFilter('all'); setStatusMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Все</div>
                      <div onClick={() => { setStatusFilter('active'); setStatusMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Активные</div>
                      <div onClick={() => { setStatusFilter('inactive'); setStatusMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer' }}>Неактивные</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Предмет</label>
                <input type="text" placeholder="Введите название предмета" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Специальность</label>
                <input type="text" placeholder="Название или код специальности" value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Цикл дисциплин</label>
                <input type="text" placeholder="ОУДБ, ОП, ПМ и т.д." value={filterCycle} onChange={(e) => setFilterCycle(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Учебный период</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" placeholder="От" value={filterPeriodFrom} onChange={(e) => setFilterPeriodFrom(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <input type="text" placeholder="До" value={filterPeriodTo} onChange={(e) => setFilterPeriodTo(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Год публикации книги</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" placeholder="От" value={filterPublishYearFrom} onChange={(e) => setFilterPublishYearFrom(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <input type="text" placeholder="До" value={filterPublishYearTo} onChange={(e) => setFilterPublishYearTo(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>ISBN</label>
                <input type="text" placeholder="978-5-..." value={filterIsbn} onChange={(e) => setFilterIsbn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button style={{ padding: '8px 20px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Применить фильтры</button>
              <button onClick={handleClearFilters} style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Сбросить</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontSize: '18px', color: '#3636FF', margin: 0 }}>Найдено записей: {sortedData.length}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortMenuOpen(!sortMenuOpen)} style={{ padding: '10px 20px', backgroundColor: '#3636FF', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', minWidth: '120px', color: '#fff', border: 'none' }}>Сортировать {sortMenuOpen ? '▲' : '▼'}</button>
              {sortMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '200px' }}>
                  <div onClick={() => { setSortBy('relevance'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Релевантность</div>
                  <div onClick={() => { setSortBy('specialty_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Специальность (А-Я)</div>
                  <div onClick={() => { setSortBy('specialty_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Специальность (Я-А)</div>
                  <div onClick={() => { setSortBy('percentage_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Обеспеченность (по возрастанию)</div>
                  <div onClick={() => { setSortBy('percentage_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer' }}>Обеспеченность (по убыванию)</div>
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
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Специальность</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Год обучения</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Цикл дисциплины</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Наименование учебного предмета</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Книга</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Кол-во обуч. / экз.</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Обеспеченность</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>{item.specialty}</div>
                    <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>{item.specialtyName}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{item.grade}</div>
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>{item.yearStart}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>{item.cycle}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>{item.subject}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333', maxWidth: '400px' }}>{item.book}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>
                    Обуч: {item.students}<br/>
                    Экз: {item.copies}
                   </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: `rgba(${item.percentage >= 100 ? '46,125,50' : (item.percentage >= 80 ? '255,152,0' : '211,47,47')}, 0.15)`,
                      color: getPercentageColor(item.percentage),
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {item.percentage}%
                    </span>
                   </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img 
                        src="/images/icon2.png" 
                        alt="Редактировать" 
                        onClick={() => handleEdit(item.id)}
                        style={{ width: '32px', height: '32px', cursor: 'pointer' }}
                      />
                      <img 
  src="/images/icon3.png" 
  alt="Удалить" 
  onClick={() => handleDelete(item)}
  style={{ width: '32px', height: '32px', cursor: 'pointer' }}
/>
                    </div>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Показано {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, sortedData.length)} из {sortedData.length}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#ccc' : '#333' }}
            >
              Предыдущая
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#ccc' : '#333' }}
            >
              Следующая
            </button>
          </div>
        </div>
          {showAddModal && (
        <AddSupplyModal
          onClose={() => setShowAddModal(false)}
          onSave={() => setShowAddModal(false)}
        />
      )}
            {showEditModal && (
        <EditSupplyModal
          onClose={() => setShowEditModal(false)}
          onSave={() => setShowEditModal(false)}
          editData={editData}
        />
      )}
            {showDeleteModal && supplyToDelete && (
        <DeleteSupplyModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          supplyData={supplyToDelete}
        />
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
    </div>
  )
}

export default BooksSupply