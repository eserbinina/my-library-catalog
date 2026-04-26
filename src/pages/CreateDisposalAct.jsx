import { useState, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CreateDisposalAct() {
  const navigate = useNavigate()

  // Поля формы
  const [actNumber, setActNumber] = useState('')
  const [actDate, setActDate] = useState('')
  const [institution, setInstitution] = useState('')
  const [department, setDepartment] = useState('')
  const [conversionFactor, setConversionFactor] = useState('')
  const [reason, setReason] = useState('')

  // Участники
  const [participants, setParticipants] = useState([
    { id: 1, name: '', position: '', role: '' }
  ])

  // Рубрики, Персоналии, Серии (списки для отображения тегов)
  const [rubricsList, setRubricsList] = useState([])
  const [personsList, setPersonsList] = useState([])
  const [seriesList, setSeriesList] = useState([])

  // Временные значения для ввода
  const [newRubric, setNewRubric] = useState('')
  const [newPerson, setNewPerson] = useState('')
  const [newSeries, setNewSeries] = useState('')

  // Книги - используем useMemo чтобы сохранить исходные данные
  const initialBooks = useMemo(() => [
    { id: 1, invNumber: '123456', bbk: 'У9246', title: 'Толстой, Л. Н. Война и мир : роман. — 5-е изд. — Москва : Художественная литература, 2020. — 1274 с.', copies: 3, writeOffQty: 0 },
    { id: 2, invNumber: '789012', bbk: 'П30/666', title: 'Марк Лутц. Основы программирования на Python : Санкт-Петербург : Диалектика, 2023', copies: 15, writeOffQty: 0 },
    { id: 3, invNumber: '345678', bbk: 'О1106/123', title: 'В.С. Шипачев. Высшая математика : Москва : Юрайт, 2021', copies: 25, writeOffQty: 0 },
    { id: 4, invNumber: '901234', bbk: 'У9245', title: 'Г.А. Абрамова. Строительные материалы : Москва : Академия, 2022', copies: 30, writeOffQty: 0 },
    { id: 5, invNumber: '567890', bbk: 'ЭК1/168', title: 'К.К. Калашова. Архитектурное проектирование : Москва : Просвещение, 2023', copies: 18, writeOffQty: 0 }
  ], [])

  const [filteredBooks, setFilteredBooks] = useState(initialBooks)
  const [searchTerm, setSearchTerm] = useState('')
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)

  // Расширенный поиск
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [isbn, setIsbn] = useState('')
  const [bbk, setBbk] = useState('')

  // Состояние для выбранных строк таблицы
  const [selectedRows, setSelectedRows] = useState([])

  const totalBooksSelected = useMemo(() => filteredBooks.filter(b => b.writeOffQty > 0).length, [filteredBooks])
  const totalCopiesSelected = useMemo(() => filteredBooks.reduce((sum, book) => sum + book.writeOffQty, 0), [filteredBooks])

  // Поиск
  const handleSearch = useCallback(() => {
    const filtered = initialBooks.filter(book =>
      searchTerm === '' ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.invNumber.includes(searchTerm) ||
      book.bbk.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredBooks(filtered)
  }, [searchTerm, initialBooks])

  // Обработчики для кнопок "+" с добавлением в список
  const handleAddRubric = useCallback(() => {
    if (newRubric.trim()) {
      setRubricsList(prev => [...prev, newRubric.trim()])
      setNewRubric('')
    }
  }, [newRubric])

  const handleAddPerson = useCallback(() => {
    if (newPerson.trim()) {
      setPersonsList(prev => [...prev, newPerson.trim()])
      setNewPerson('')
    }
  }, [newPerson])

  const handleAddSeries = useCallback(() => {
    if (newSeries.trim()) {
      setSeriesList(prev => [...prev, newSeries.trim()])
      setNewSeries('')
    }
  }, [newSeries])

  // Удаление тегов
  const handleRemoveRubric = useCallback((indexToRemove) => {
    setRubricsList(prev => prev.filter((_, index) => index !== indexToRemove))
  }, [])

  const handleRemovePerson = useCallback((indexToRemove) => {
    setPersonsList(prev => prev.filter((_, index) => index !== indexToRemove))
  }, [])

  const handleRemoveSeries = useCallback((indexToRemove) => {
    setSeriesList(prev => prev.filter((_, index) => index !== indexToRemove))
  }, [])

  // Обработка чекбокса
  const handleRowSelect = useCallback((bookId) => {
    setSelectedRows(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId)
      } else {
        return [...prev, bookId]
      }
    })
  }, [])

  // ИСПРАВЛЕНО: функция обновления количества книг
  const handleWriteOffQtyChange = useCallback((id, newQty) => {
    setFilteredBooks(prev => prev.map(book =>
      book.id === id ? { ...book, writeOffQty: Math.min(Math.max(0, newQty), book.copies) } : book
    ))
  }, [])

  const handleAddParticipant = useCallback(() => {
    setParticipants(prev => [...prev, { id: Date.now(), name: '', position: '', role: '' }])
  }, [])

  const handleParticipantChange = useCallback((id, field, value) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }, [])

  const handleConductAct = useCallback(() => {
    if (!actNumber || !actDate || !institution || !department) {
      alert('Заполните обязательные поля')
      return
    }
    alert('Акт успешно проведен!')
    navigate('/librarian/disposal-acts')
  }, [actNumber, actDate, institution, department, navigate])

  const InnerCard = useCallback(({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>{title}</h2>
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
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Создание акта выбытия</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/librarian/disposal-acts" style={{ padding: '10px 20px', backgroundColor: 'transparent', color: '#3636FF', border: '1px solid #3636FF', borderRadius: '8px', textDecoration: 'none' }}>Создать акт</Link>
          <button onClick={handleConductAct} style={{ padding: '10px 20px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Провести акт</button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        <Link to="/librarian/disposal-acts" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>← Назад к актам</Link>

        {/* ИНФОРМАЦИЯ ОБ АКТЕ */}
        <InnerCard title="Информация об акте">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Номер акта *</div>
              <input type="text" placeholder="AB-001/2025" value={actNumber} onChange={(e) => setActNumber(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #eee', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Дата акта *</div>
              <input type="text" placeholder="15.01.2025" value={actDate} onChange={(e) => setActDate(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #eee', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Учреждение *</div>
              <input type="text" placeholder="Колледж ААСК" value={institution} onChange={(e) => setInstitution(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #eee', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Структурное подразделение *</div>
              <input type="text" placeholder="Библиотека" value={department} onChange={(e) => setDepartment(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #eee', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Коэффициент пересчета</div>
              <input type="text" placeholder="1.00" value={conversionFactor} onChange={(e) => setConversionFactor(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #eee', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Причина списания</div>
              <input type="text" placeholder="Ветхий / Утеря / Списание" value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #eee', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
          </div>
        </InnerCard>

        {/* УЧАСТНИКИ АКТА */}
        <InnerCard title="Участники акта *">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>ФИО</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Должность</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Роль в акте</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, idx) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>
                      <input type="text" placeholder="ФИО" value={p.name} onChange={(e) => handleParticipantChange(p.id, 'name', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #eee', borderRadius: '6px', boxSizing: 'border-box' }} />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input type="text" placeholder="Должность" value={p.position} onChange={(e) => handleParticipantChange(p.id, 'position', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #eee', borderRadius: '6px', boxSizing: 'border-box' }} />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input type="text" placeholder="Роль в акте" value={p.role} onChange={(e) => handleParticipantChange(p.id, 'role', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #eee', borderRadius: '6px', boxSizing: 'border-box' }} />
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {idx === participants.length - 1 && (
                        <button onClick={handleAddParticipant} style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InnerCard>

        {/* КАТАЛОГ КНИГ */}
        <InnerCard title="Каталог книг для списания">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Выбрано книг: {totalBooksSelected} (экз.: {totalCopiesSelected})</div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Поиск по названию, автору, издателю, рубрике" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px' }} 
            />
            <button onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)} style={{ padding: '12px 20px', backgroundColor: advancedSearchOpen ? '#3636FF' : '#f0f0f0', color: advancedSearchOpen ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>Расширенный поиск {advancedSearchOpen ? '▲' : '▼'}</button>
            <button onClick={handleSearch} style={{ padding: '12px 20px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Найти</button>
          </div>

          {/* РАСШИРЕННЫЙ ПОИСК */}
          {advancedSearchOpen && (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
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
                  <input type="text" placeholder="978-5-..." value={isbn} onChange={(e) => setIsbn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>ББК</label>
                  <input type="text" placeholder="У9246" value={bbk} onChange={(e) => setBbk(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* РУБРИКИ с кнопкой "+" и тегами */}
              <div style={{ marginTop: '20px', marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Рубрики:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  {rubricsList.map((rubric, idx) => (
                    <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px 4px 12px', backgroundColor: 'rgba(54,54,255,0.08)', color: '#3636FF', borderRadius: '20px', fontSize: '13px' }}>
                      {rubric}
                      <span onClick={() => handleRemoveRubric(idx)} style={{ cursor: 'pointer', fontSize: '14px' }}>✖</span>
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="Введите рубрику" 
                    value={newRubric} 
                    onChange={(e) => setNewRubric(e.target.value)} 
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} 
                  />
                  <button 
                    onClick={handleAddRubric}
                    style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ПЕРСОНАЛИИ с кнопкой "+" и тегами */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Персоналии:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  {personsList.map((person, idx) => (
                    <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px 4px 12px', backgroundColor: 'rgba(255,152,0,0.1)', color: '#e65100', borderRadius: '20px', fontSize: '13px' }}>
                      {person}
                      <span onClick={() => handleRemovePerson(idx)} style={{ cursor: 'pointer', fontSize: '14px' }}>✖</span>
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="Введите персоналию" 
                    value={newPerson} 
                    onChange={(e) => setNewPerson(e.target.value)} 
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} 
                  />
                  <button 
                    onClick={handleAddPerson}
                    style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* СЕРИИ с кнопкой "+" и тегами */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Серии:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  {seriesList.map((series, idx) => (
                    <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px 4px 12px', backgroundColor: 'rgba(54,54,255,0.08)', color: '#3636FF', borderRadius: '20px', fontSize: '13px' }}>
                      {series}
                      <span onClick={() => handleRemoveSeries(idx)} style={{ cursor: 'pointer', fontSize: '14px' }}>✖</span>
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="Введите серию" 
                    value={newSeries} 
                    onChange={(e) => setNewSeries(e.target.value)} 
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} 
                  />
                  <button 
                    onClick={handleAddSeries}
                    style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => console.log('Расширенный поиск')} style={{ padding: '8px 20px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Найти</button>
                <button onClick={() => {
                  setYearFrom(''); setYearTo(''); setIsbn(''); setBbk('')
                }} style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Очистить</button>
              </div>
            </div>
          )}

          {/* ТАБЛИЦА КНИГ - ИСПРАВЛЕНА */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '40px' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Инв. позиции</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>ББК</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Книга</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Экз.</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Кол-во для списания</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map(book => {
                  const isSelected = selectedRows.includes(book.id)
                  return (
                    <tr 
                      key={book.id} 
                      style={{ 
                        borderBottom: '1px solid #eee', 
                        backgroundColor: isSelected ? 'rgba(54, 54, 255, 0.05)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleRowSelect(book.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333' }}>{book.invNumber}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#3636FF' }}>{book.bbk}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333' }}>{book.title}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#2e7d32', fontWeight: '500' }}>{book.copies} шт.</td>
                      <td style={{ padding: '12px 16px' }}>
                        <input 
                          type="number" 
                          min="0" 
                          max={book.copies} 
                          value={book.writeOffQty} 
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              handleWriteOffQtyChange(book.id, 0);
                            } else {
                              handleWriteOffQtyChange(book.id, parseInt(val, 10) || 0);
                            }
                          }}
                          style={{ width: '80px', padding: '6px', border: '1px solid #ddd', borderRadius: '6px', textAlign: 'center' }} 
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </InnerCard>
        
      </div>

      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '40px 20px', marginTop: '40px', textAlign: 'center' }}>
        <p>Библиотека ААСК — Электронный библиотечный каталог</p>
        <p>© 2026 Колледж ААСК. Все права защищены</p>
      </footer>
    </div>
  )
}

export default CreateDisposalAct