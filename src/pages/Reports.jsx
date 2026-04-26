import { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'

function Reports() {
  // Активная вкладка
  const [activeTab, setActiveTab] = useState('catalog')

  // Данные для таблицы - КАТАЛОГ КНИГ
  const [catalogBooks] = useState([
    { id: 1, invNumber: '123456', bbk: 'Y9246', title: 'Толстой, Л. Н. Война и мир : роман. — 5-е изд. — Москва : Художественная литература, 2020. — 1274 с.', copies: 3 },
    { id: 2, invNumber: '789012', bbk: 'П30/666', title: 'Марк Лутц. Основы программирования на Python : Санкт-Петербург : Диалектика, 2023', copies: 15 },
    { id: 3, invNumber: '345678', bbk: 'О1106/123', title: 'В.С. Шипачев. Высшая математика : Москва : Юрайт, 2021', copies: 25 },
    { id: 4, invNumber: '901234', bbk: 'Y9245', title: 'Г.А. Абрамова. Строительные материалы : Москва : Академия, 2022', copies: 30 },
    { id: 5, invNumber: '567890', bbk: 'ЭК1/168', title: 'К.К. Калашова. Архитектурное проектирование : Москва : Просвещение, 2023', copies: 18 }
  ])

  // Данные для КАРТОТЕКИ КНИГООБЕСПЕЧЕННОСТИ
  const [supplyData] = useState([
    { 
      id: 1, 
      specialty: '09.02.07 Информационные системы и программирование', 
      subject: 'Основы программирования', 
      educationLevel: '11 класс', 
      academicYear: '2024/2025', 
      book: 'Марк Лутц. Основы программирования на Python'
    },
    { 
      id: 2, 
      specialty: '08.02.01 Строительство и эксплуатация зданий', 
      subject: 'Строительные материалы', 
      educationLevel: '9 класс', 
      academicYear: '2024/2025', 
      book: 'Г.А. Абрамова. Строительные материалы'
    }
  ])

  // Данные для РЕЕСТРА СПИСАННЫХ КНИГ (по макету)
  const [disposalData] = useState([
    { id: 1, actNumber: 'AB-001/2025', date: '15.01.2025', status: 'Проведен', quantity: 7 },
    { id: 2, actNumber: 'AB-002/2025', date: '18.01.2025', status: 'Редактируется', quantity: 10 },
    { id: 3, actNumber: 'AB-003/2025', date: '20.01.2025', status: 'Черновик', quantity: 3 }
  ])

  // Состояния для поиска и фильтрации
  const [searchTerm, setSearchTerm] = useState('')
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [showMenuOpen, setShowMenuOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])
  const [exportFormat, setExportFormat] = useState('excel')
  const [formatMenuOpen, setFormatMenuOpen] = useState(false)

  // Расширенный поиск
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [isbn, setIsbn] = useState('')
  const [bbk, setBbk] = useState('')

  // Текущие данные
  const currentData = useMemo(() => {
    switch(activeTab) {
      case 'catalog': return catalogBooks
      case 'supply': return supplyData
      case 'disposal': return disposalData
      default: return catalogBooks
    }
  }, [activeTab, catalogBooks, supplyData, disposalData])

  // Фильтрация данных
  const filteredData = useMemo(() => {
    if (searchTerm === '') return currentData
    
    const searchLower = searchTerm.toLowerCase()
    
    if (activeTab === 'supply') {
      return currentData.filter(item => 
        item.specialty.toLowerCase().includes(searchLower) ||
        item.subject.toLowerCase().includes(searchLower) ||
        item.book.toLowerCase().includes(searchLower)
      )
    } else if (activeTab === 'disposal') {
      return currentData.filter(item =>
        item.actNumber.toLowerCase().includes(searchLower) ||
        item.status.toLowerCase().includes(searchLower)
      )
    } else {
      return currentData.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.invNumber.includes(searchTerm) ||
        item.bbk.toLowerCase().includes(searchLower)
      )
    }
  }, [currentData, searchTerm, activeTab])

  // Сортировка данных
  const sortedData = useMemo(() => {
    const data = [...filteredData]
    switch(sortBy) {
      case 'inv_asc': return data.sort((a, b) => (a.invNumber || '').localeCompare(b.invNumber || ''))
      case 'inv_desc': return data.sort((a, b) => (b.invNumber || '').localeCompare(a.invNumber || ''))
      case 'title_asc': return data.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
      case 'title_desc': return data.sort((a, b) => (b.title || '').localeCompare(a.title || ''))
      default: return data
    }
  }, [filteredData, sortBy])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    return sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  // Обработчики с useCallback
  const handleSearch = useCallback(() => {
    setCurrentPage(1)
  }, [])

  const handleRowSelect = useCallback((id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id)
      } else {
        return [...prev, id]
      }
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map(item => item.id))
    }
  }, [selectedRows, paginatedData])

  const handleExport = useCallback(() => {
    const selectedItems = currentData.filter(item => selectedRows.includes(item.id))
    if (selectedItems.length === 0) {
      alert('Выберите записи для выгрузки')
      return
    }
    alert(`Выгрузка ${selectedItems.length} записей в формате ${exportFormat}\nБудет реализовано позже`)
  }, [selectedRows, currentData, exportFormat])

  const handleClearAdvancedSearch = useCallback(() => {
    setYearFrom('')
    setYearTo('')
    setIsbn('')
    setBbk('')
  }, [])

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
    setSelectedRows([])
    setCurrentPage(1)
    setSearchTerm('')
  }, [])

  const getStatusColor = useCallback((status) => {
    switch(status) {
      case 'Проведен': return '#2e7d32'
      case 'Редактируется': return '#ed6c02'
      case 'Черновик': return '#757575'
      default: return '#333'
    }
  }, [])

  const getColumns = useCallback(() => {
    switch(activeTab) {
      case 'catalog': return ['Инв. позиция', 'ББК индекс', 'Книга', 'Экз.']
      case 'supply': return ['Специальность', 'Предмет', 'Уровень образования', 'Учебный год', 'Книга']
      case 'disposal': return ['Номер', 'Дата акта', 'Статус акта', 'Кол-во книг']
      default: return ['Инв. позиция', 'ББК индекс', 'Книга', 'Экз.']
    }
  }, [activeTab])

  const getRowData = useCallback((item) => {
    switch(activeTab) {
      case 'catalog': return [item.invNumber, item.bbk, item.title, `${item.copies} шт.`]
      case 'supply': return [item.specialty, item.subject, item.educationLevel, item.academicYear, item.book]
      case 'disposal': return [item.actNumber, item.date, item.status, `${item.quantity}`]
      default: return [item.invNumber, item.bbk, item.title, `${item.copies} шт.`]
    }
  }, [activeTab])

  const getCellStyle = useCallback((item, idx, value) => {
    if (activeTab === 'disposal' && idx === 2) {
      return { color: getStatusColor(value), fontWeight: '500' }
    }
    if (activeTab === 'catalog' && idx === 1) {
      return { color: '#3636FF', fontWeight: '500' }
    }
    if (activeTab === 'catalog' && idx === 3) {
      return { color: '#2e7d32', fontWeight: '500' }
    }
    return { color: '#333' }
  }, [activeTab, getStatusColor])

  const handleItemsPerPageChange = useCallback((num) => {
    setItemsPerPage(num)
    setCurrentPage(1)
    setShowMenuOpen(false)
  }, [])

  const tabs = [
    { id: 'catalog', label: 'Каталог книг' },
    { id: 'supply', label: 'Картотека книгообеспеченности' },
    { id: 'disposal', label: 'Реестр списанных книг' }
  ]

  const InnerCard = useCallback(({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
      {title && <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>{title}</h2>}
      {children}
    </div>
  ), [])

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
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Формирование отчетов</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/librarian/panel" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px' }}>← Назад к панели</Link>
          <button style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#3636FF', border: '1px solid #3636FF', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Выйти</button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {/* ТАБЫ */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', borderBottom: '1px solid #eee' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === tab.id ? '#3636FF' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#666',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '400'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ПОИСК + РАСШИРЕННЫЙ ПОИСК */}
        <InnerCard>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input 
              type="text" 
              placeholder={
                activeTab === 'supply' ? "Поиск по специальности, предмету, книге..." :
                activeTab === 'disposal' ? "Поиск по номеру акта..." :
                "Поиск по названию, ББК, инвентарному номеру..."
              }
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
            />
            <button 
              onClick={() => setAdvancedSearchOpen(prev => !prev)} 
              style={{ padding: '12px 20px', backgroundColor: advancedSearchOpen ? '#3636FF' : '#f0f0f0', color: advancedSearchOpen ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
            >
              Расширенный поиск {advancedSearchOpen ? '▲' : '▼'}
            </button>
            <button 
              onClick={handleSearch}
              style={{ padding: '12px 20px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
            >
              Найти
            </button>
          </div>

          {advancedSearchOpen && (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Год издания</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" placeholder="От" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                    <input type="text" placeholder="До" value={yearTo} onChange={(e) => setYearTo(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>ISBN</label>
                  <input type="text" placeholder="978-5-..." value={isbn} onChange={(e) => setIsbn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>ББК</label>
                  <input type="text" placeholder="У9246" value={bbk} onChange={(e) => setBbk(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={handleSearch} style={{ padding: '8px 20px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Найти</button>
                <button onClick={handleClearAdvancedSearch} style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Очистить</button>
              </div>
            </div>
          )}
        </InnerCard>

        {/* ИНФОРМАЦИЯ О НАЙДЕННЫХ ЗАПИСЯХ + СОРТИРОВКА */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Найдено записей: <span style={{ color: '#3636FF', fontWeight: '600' }}>{sortedData.length}</span></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortMenuOpen(prev => !prev)} style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', minWidth: '120px', color: '#333', border: '1px solid #ddd' }}>Сортировать {sortMenuOpen ? '▲' : '▼'}</button>
              {sortMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '200px' }}>
                  <div onClick={() => { setSortBy('relevance'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Релевантность</div>
                  <div onClick={() => { setSortBy('inv_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Инв. номер (по возрастанию)</div>
                  <div onClick={() => { setSortBy('inv_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Инв. номер (по убыванию)</div>
                  <div onClick={() => { setSortBy('title_asc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Название (А-Я)</div>
                  <div onClick={() => { setSortBy('title_desc'); setSortMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer' }}>Название (Я-А)</div>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenuOpen(prev => !prev)} style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', minWidth: '100px', color: '#333', border: '1px solid #ddd' }}>Показать {showMenuOpen ? '▲' : '▼'}</button>
              {showMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '100px' }}>
                  {[10, 20, 50, 100].map(num => (
                    <div key={num} onClick={() => handleItemsPerPageChange(num)} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: num !== 100 ? '1px solid #eee' : 'none' }}>{num}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ИНФОРМАЦИЯ О ВЫБРАННЫХ ЗАПИСЯХ + ФОРМАТ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Выбрано записей: {selectedRows.length}</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', color: '#666' }}>Формат:</div>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setFormatMenuOpen(prev => !prev)} style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', color: '#333', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', minWidth: '80px' }}>{exportFormat === 'excel' ? 'Excel' : 'PDF'} {formatMenuOpen ? '▲' : '▼'}</button>
                {formatMenuOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, minWidth: '80px' }}>
                    <div onClick={() => { setExportFormat('excel'); setFormatMenuOpen(false) }} style={{ padding: '8px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Excel</div>
                    <div onClick={() => { setExportFormat('pdf'); setFormatMenuOpen(false) }} style={{ padding: '8px 16px', cursor: 'pointer' }}>PDF</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={handleExport}
            style={{ padding: '10px 24px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
          >
            Экспортировать
          </button>
        </div>

        {/* ТАБЛИЦА */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '12px 16px', textAlign: 'center', width: '40px' }}>
                  <input type="checkbox" checked={selectedRows.length === paginatedData.length && paginatedData.length > 0} onChange={handleSelectAll} style={{ cursor: 'pointer' }} />
                </th>
                {getColumns().map((col, idx) => (
                  <th key={idx} style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '500' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => {
                const isSelected = selectedRows.includes(item.id)
                const rowData = getRowData(item)
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee', backgroundColor: isSelected ? 'rgba(54, 54, 255, 0.05)' : 'transparent' }}>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleRowSelect(item.id)} style={{ cursor: 'pointer' }} />
                    </td>
                    {rowData.map((value, idx) => {
                      const cellStyle = getCellStyle(item, idx, value)
                      return (
                        <td key={idx} style={{ padding: '12px 16px', fontSize: '14px', ...cellStyle }}>
                          {value}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              {paginatedData.length === 0 && (
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td colSpan={getColumns().length + 1} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>Нет данных</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ПАГИНАЦИЯ */}
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
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>г. Барнаул, ул. Правды, 123</p>
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

export default Reports