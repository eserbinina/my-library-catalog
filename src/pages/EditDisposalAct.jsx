import { useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function EditDisposalAct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [act, setAct] = useState({
    id: 1,
    actNumber: "AB-001/2025",
    date: "15.01.2025",
    status: "Проведен",
    institution: "Колледж ААСК",
    department: "Библиотека",
    conversionFactor: "1.0",
    reason: "Физический износ",
    participants: [
      { id: 1, name: "Иванова Мария Петровна", position: "Заведующая библиотекой", role: "Председатель комиссии" },
      { id: 2, name: "Петров Иван Сергеевич", position: "Библиотекарь", role: "Член комиссии" },
      { id: 3, name: "Сидорова Анна Ивановна", position: "Библиотекарь", role: "Секретарь" }
    ],
    books: [
      { id: 1, invNumber: "123456", bbk: "Y9246", title: "Толстой, Л. Н. Война и мир : роман. — 5-е изд. — Москва : Художественная литература, 2020. — 1274 с.", quantity: 2, available: 3 },
      { id: 2, invNumber: "789012", bbk: "П30/666", title: "Марк Лутц. Основы программирования на Python : Санкт-Петербург : Диалектика, 2023", quantity: 5, available: 15 }
    ]
  })

  const [newParticipant, setNewParticipant] = useState({ name: '', position: '', role: '' })
  const [showAddParticipant, setShowAddParticipant] = useState(false)
  const [rubricsList, setRubricsList] = useState([])
  const [personsList, setPersonsList] = useState([])
  const [seriesList, setSeriesList] = useState([])
  const [newRubric, setNewRubric] = useState('')
  const [newPerson, setNewPerson] = useState('')
  const [newSeries, setNewSeries] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [isbn, setIsbn] = useState('')
  const [bbk, setBbk] = useState('')

  const filteredBooks = act.books.filter(book =>
    searchTerm === '' ||
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.invNumber.includes(searchTerm) ||
    book.bbk.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalBooks = filteredBooks.length
  const totalCopies = filteredBooks.reduce((sum, book) => sum + book.quantity, 0)

  const handleActChange = (field, value) => {
    setAct(prev => ({ ...prev, [field]: value }))
  }

  const handleParticipantChange = (participantId, field, value) => {
    setAct(prev => ({
      ...prev,
      participants: prev.participants.map(p =>
        p.id === participantId ? { ...p, [field]: value } : p
      )
    }))
  }

  const handleAddParticipant = () => {
    if (newParticipant.name.trim()) {
      setAct(prev => ({
        ...prev,
        participants: [...prev.participants, { ...newParticipant, id: Date.now() }]
      }))
      setNewParticipant({ name: '', position: '', role: '' })
      setShowAddParticipant(false)
    }
  }

  const handleRemoveParticipant = (participantId) => {
    setAct(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== participantId)
    }))
  }

  const handleBookQuantityChange = (bookId, newQuantity) => {
    setAct(prev => ({
      ...prev,
      books: prev.books.map(book =>
        book.id === bookId ? { ...book, quantity: Math.min(Math.max(0, newQuantity), book.available) } : book
      )
    }))
  }

  const handleRowSelect = (bookId) => {
    setSelectedRows(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId)
      } else {
        return [...prev, bookId]
      }
    })
  }

  const handleAddRubric = () => {
    if (newRubric.trim()) {
      setRubricsList(prev => [...prev, newRubric.trim()])
      setNewRubric('')
    }
  }

  const handleAddPerson = () => {
    if (newPerson.trim()) {
      setPersonsList(prev => [...prev, newPerson.trim()])
      setNewPerson('')
    }
  }

  const handleAddSeries = () => {
    if (newSeries.trim()) {
      setSeriesList(prev => [...prev, newSeries.trim()])
      setNewSeries('')
    }
  }

  const handleRemoveRubric = (indexToRemove) => {
    setRubricsList(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleRemovePerson = (indexToRemove) => {
    setPersonsList(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleRemoveSeries = (indexToRemove) => {
    setSeriesList(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleSave = () => {
    alert('Акт успешно сохранен!')
    navigate(`/librarian/view-disposal-act/${id}`)
  }

  const handleCancel = () => {
    navigate(`/librarian/view-disposal-act/${id}`)
  }

  const handleAdvancedSearch = () => {
    console.log('Расширенный поиск:', { yearFrom, yearTo, isbn, bbk, rubricsList, personsList, seriesList })
  }

  const handleClearAdvancedSearch = () => {
    setYearFrom('')
    setYearTo('')
    setIsbn('')
    setBbk('')
    setRubricsList([])
    setPersonsList([])
    setSeriesList([])
  }

  const InnerCard = ({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '24px 20px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>{title}</h2>
      {children}
    </div>
  )

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
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Редактирование акта {act.actNumber}</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSave} style={{ padding: '8px 20px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Сохранить</button>
          <button onClick={handleCancel} style={{ padding: '8px 20px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Отмена</button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <Link to={`/librarian/view-disposal-act/${id}`} style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px' }}>← Назад к просмотру</Link>
        </div>

        <InnerCard title="Основная информация">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Номер акта *</div>
              <input type="text" value={act.actNumber} onChange={(e) => handleActChange('actNumber', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Дата акта *</div>
              <input type="text" value={act.date} onChange={(e) => handleActChange('date', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Учреждение *</div>
              <input type="text" value={act.institution} onChange={(e) => handleActChange('institution', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Структурное подразделение *</div>
              <input type="text" value={act.department} onChange={(e) => handleActChange('department', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Коэффициент пересчета</div>
              <input type="text" value={act.conversionFactor} onChange={(e) => handleActChange('conversionFactor', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Причина списания *</div>
              <input type="text" value={act.reason} onChange={(e) => handleActChange('reason', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          </div>
        </InnerCard>

        <InnerCard title={`Участники акта (${act.participants.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {act.participants.map((p) => (
              <div key={p.id} style={{ backgroundColor: 'rgba(54, 54, 255, 0.05)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'center' }}>
                  <input type="text" placeholder="ФИО" value={p.name} onChange={(e) => handleParticipantChange(p.id, 'name', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                  <input type="text" placeholder="Должность" value={p.position} onChange={(e) => handleParticipantChange(p.id, 'position', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                  <input type="text" placeholder="Роль в акте" value={p.role} onChange={(e) => handleParticipantChange(p.id, 'role', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                  <button onClick={() => handleRemoveParticipant(p.id)} style={{ width: '32px', height: '32px', backgroundColor: '#ffebee', color: '#d32f2f', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
          
          {!showAddParticipant ? (
            <button onClick={() => setShowAddParticipant(true)} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>+ Добавить участника</button>
          ) : (
            <div style={{ marginTop: '16px', backgroundColor: 'rgba(54, 54, 255, 0.05)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'center' }}>
                <input type="text" placeholder="ФИО" value={newParticipant.name} onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                <input type="text" placeholder="Должность" value={newParticipant.position} onChange={(e) => setNewParticipant({ ...newParticipant, position: e.target.value })} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                <input type="text" placeholder="Роль в акте" value={newParticipant.role} onChange={(e) => setNewParticipant({ ...newParticipant, role: e.target.value })} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                <button onClick={handleAddParticipant} style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>✓</button>
              </div>
              <button onClick={() => setShowAddParticipant(false)} style={{ marginTop: '12px', padding: '6px 12px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Отмена</button>
            </div>
          )}
        </InnerCard>

        <InnerCard title="Каталог книг для списания">
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Поиск по названию, автору, издателю, рубрике" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
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
                  <input type="text" placeholder="Введите рубрику" value={newRubric} onChange={(e) => setNewRubric(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <button onClick={handleAddRubric} style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>+</button>
                </div>
              </div>

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
                  <input type="text" placeholder="Введите персоналию" value={newPerson} onChange={(e) => setNewPerson(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <button onClick={handleAddPerson} style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>+</button>
                </div>
              </div>

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
                  <input type="text" placeholder="Введите серию" value={newSeries} onChange={(e) => setNewSeries(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <button onClick={handleAddSeries} style={{ width: '32px', height: '32px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={handleAdvancedSearch} style={{ padding: '8px 20px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Найти</button>
                <button onClick={handleClearAdvancedSearch} style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Очистить</button>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Всего книг: <span style={{ color: '#3636FF', fontWeight: '600' }}>{totalBooks}</span> (экз.: <span style={{ color: '#3636FF', fontWeight: '600' }}>{totalCopies}</span>)
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '40px' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Инв. позиция</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>ББК</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Книга</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', color: '#666', fontSize: '13px' }}>В наличии</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', color: '#666', fontSize: '13px' }}>Кол-во для списания</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => {
                  const isSelected = selectedRows.includes(book.id)
                  return (
                    <tr key={book.id} style={{ borderBottom: '1px solid #eee', backgroundColor: isSelected ? 'rgba(54, 54, 255, 0.05)' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <input type="checkbox" checked={isSelected} onChange={() => handleRowSelect(book.id)} style={{ cursor: 'pointer' }} />
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333' }}>{book.invNumber}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#3636FF', fontWeight: '500' }}>{book.bbk}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333', maxWidth: '400px' }}>{book.title}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '14px', color: '#2e7d32', fontWeight: '500' }}>{book.available} шт.</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <input type="number" min="0" max={book.available} value={book.quantity} onChange={(e) => handleBookQuantityChange(book.id, parseInt(e.target.value) || 0)} style={{ width: '80px', padding: '6px', border: '1px solid #ddd', borderRadius: '6px', textAlign: 'center' }} />
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

export default EditDisposalAct