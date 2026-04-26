import { useState } from 'react'

function AddSupplyModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    specialty: "",
    cycle: "",
    subject: "",
    academicYear: "",
    educationLevel: "",
    selectedBooks: []
  })

  const [educationMenuOpen, setEducationMenuOpen] = useState(false)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  
  const [filterYearFrom, setFilterYearFrom] = useState('')
  const [filterYearTo, setFilterYearTo] = useState('')
  const [filterIsbn, setFilterIsbn] = useState('')
  const [filterBbk, setFilterBbk] = useState('')
  const [rubrics, setRubrics] = useState([])
  const [rubricInput, setRubricInput] = useState('')
  const [persons, setPersons] = useState([])
  const [personInput, setPersonInput] = useState('')
  const [series, setSeries] = useState([])
  const [seriesInput, setSeriesInput] = useState('')

  const [appliedFilters, setAppliedFilters] = useState({
    yearFrom: '',
    yearTo: '',
    isbn: '',
    bbk: '',
    rubrics: [],
    persons: [],
    series: []
  })

  const [catalogBooks] = useState([
    { id: 1, invNumber: "123456", bbk: "У9246", title: "Толстой, Л. Н. Война и мир : роман. — 5-е изд. — Москва : Художественная литература, 2020. — 1274 с.", copies: 3, year: 2020, isbn: "978-5-280-03824-4", rubric: "Художественная литература", person: "Толстой Л.Н.", series: "Русская классика" },
    { id: 2, invNumber: "789012", bbk: "П30/866", title: "Марк Лутц. Основы программирования на Python : Санкт-Петербург : Диалектика, 2023", copies: 15, year: 2023, isbn: "978-5-389-12345-6", rubric: "Программирование", person: "Марк Лутц", series: "Python" },
    { id: 3, invNumber: "345678", bbk: "О1Ю6/123", title: "В.С. Шпигаль. Высшая математика : Москва : Юрайт, 2021", copies: 25, year: 2021, isbn: "978-5-04-123456-7", rubric: "Математика", person: "Шпигаль В.С.", series: "Высшее образование" },
    { id: 4, invNumber: "901234", bbk: "У9245", title: "Г.А. Абрамова. Строительные материалы : Москва : Академия, 2022", copies: 30, year: 2022, isbn: "978-5-02-038268-8", rubric: "Строительство", person: "Абрамова Г.А.", series: "СПО" },
    { id: 5, invNumber: "567890", bbk: "ЭК1/168", title: "К.К. Калашова. Архитектурное проектирование : Москва : Просвещение, 2023", copies: 18, year: 2023, isbn: "978-5-17-123456-7", rubric: "Архитектура", person: "Калашова К.К.", series: "Архитектура" }
  ])

  const [searchCatalogTerm, setSearchCatalogTerm] = useState('')
  const [selectedBooks, setSelectedBooks] = useState([])

  const applyFilters = () => {
    setAppliedFilters({
      yearFrom: filterYearFrom,
      yearTo: filterYearTo,
      isbn: filterIsbn,
      bbk: filterBbk,
      rubrics: [...rubrics],
      persons: [...persons],
      series: [...series]
    })
  }

  const resetFilters = () => {
    setFilterYearFrom('')
    setFilterYearTo('')
    setFilterIsbn('')
    setFilterBbk('')
    setRubrics([])
    setPersons([])
    setSeries([])
    setAppliedFilters({
      yearFrom: '',
      yearTo: '',
      isbn: '',
      bbk: '',
      rubrics: [],
      persons: [],
      series: []
    })
  }

  const filteredCatalogBooks = catalogBooks.filter(book => {
    if (searchCatalogTerm) {
      const searchLower = searchCatalogTerm.toLowerCase()
      const matchTitle = book.title.toLowerCase().includes(searchLower)
      const matchInv = book.invNumber.includes(searchCatalogTerm)
      const matchBbk = book.bbk.toLowerCase().includes(searchLower)
      if (!matchTitle && !matchInv && !matchBbk) return false
    }
    
    if (appliedFilters.yearFrom && book.year < parseInt(appliedFilters.yearFrom)) return false
    if (appliedFilters.yearTo && book.year > parseInt(appliedFilters.yearTo)) return false
    if (appliedFilters.isbn && !book.isbn.includes(appliedFilters.isbn)) return false
    if (appliedFilters.bbk && !book.bbk.includes(appliedFilters.bbk)) return false
    if (appliedFilters.rubrics.length > 0 && !appliedFilters.rubrics.some(r => book.rubric.includes(r))) return false
    if (appliedFilters.persons.length > 0 && !appliedFilters.persons.some(p => book.person.includes(p))) return false
    if (appliedFilters.series.length > 0 && !appliedFilters.series.some(s => book.series.includes(s))) return false
    
    return true
  })

  const handleAddRubric = () => {
    if (rubricInput.trim()) {
      setRubrics([...rubrics, rubricInput])
      setRubricInput('')
    }
  }

  const handleAddPerson = () => {
    if (personInput.trim()) {
      setPersons([...persons, personInput])
      setPersonInput('')
    }
  }

  const handleAddSeries = () => {
    if (seriesInput.trim()) {
      setSeries([...series, seriesInput])
      setSeriesInput('')
    }
  }

  const handleRemoveItem = (setter, items, index) => {
    setter(items.filter((_, i) => i !== index))
  }

  const toggleBookSelection = (book) => {
    const isSelected = selectedBooks.some(b => b.id === book.id)
    if (isSelected) {
      setSelectedBooks(selectedBooks.filter(b => b.id !== book.id))
    } else {
      setSelectedBooks([...selectedBooks, book])
    }
  }

  const removeSelectedBook = (bookId) => {
    setSelectedBooks(selectedBooks.filter(b => b.id !== bookId))
  }

  const handleSubmit = () => {
    const result = {
      ...formData,
      selectedBooks: selectedBooks
    }
    console.log('Данные записи:', result)
    alert('Запись добавлена (заглушка)')
    onClose()
  }

  return (
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
      zIndex: 1000,
      overflow: 'auto'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        maxWidth: '1400px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        position: 'relative'

      }}>
        <button
  onClick={onClose}
  style={{
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999'
  }}
>
  ✕
</button>
        <h2 style={{ fontSize: '24px', margin: '0 0 20px 0', color: '#333' }}>Добавить запись в картотеку</h2>
        
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* ЛЕВАЯ КОЛОНКА - ОСНОВНАЯ ИНФОРМАЦИЯ + ВЫБРАННЫЕ КНИГИ */}
          <div style={{ flex: 1, minWidth: '350px' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Специальность *</label>
                <input type="text" placeholder="Введите название специальности" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Цикл дисциплин *</label>
                <input type="text" placeholder="Например: ОУДБ.01" value={formData.cycle} onChange={(e) => setFormData({ ...formData, cycle: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Предмет *</label>
                <input type="text" placeholder="Введите название предмета" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Учебный год *</label>
                  <input type="text" placeholder="2025-2026" value={formData.academicYear} onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Уровень образования *</label>
                  <div style={{ position: 'relative' }}>
                    <button onClick={() => setEducationMenuOpen(!educationMenuOpen)} style={{ width: '100%', padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                      {formData.educationLevel || 'Выберите уровень'}
                      <span>{educationMenuOpen ? '▲' : '▼'}</span>
                    </button>
                    {educationMenuOpen && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000 }}>
                        <div onClick={() => { setFormData({ ...formData, educationLevel: '9 класс' }); setEducationMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>9 класс</div>
                        <div onClick={() => { setFormData({ ...formData, educationLevel: '11 класс' }); setEducationMenuOpen(false) }} style={{ padding: '10px 16px', cursor: 'pointer' }}>11 класс</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ВЫБРАННЫЕ КНИГИ - В ЛЕВОЙ КОЛОНКЕ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#333' }}>Выбранные книги</h3>
              {selectedBooks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999', fontSize: '14px' }}>
                  Нет выбранных книг
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                  {selectedBooks.map(book => (
                    <div key={book.id} style={{ backgroundColor: 'rgba(54, 54, 255, 0.08)', borderRadius: '8px', padding: '12px', position: 'relative' }}>
                      <button
                        onClick={() => removeSelectedBook(book.id)}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '8px',
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          color: '#999'
                        }}
                      >
                        ✕
                      </button>
                      <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Инв. № {book.invNumber} | ББК: {book.bbk}</div>
                      <div style={{ fontSize: '13px', color: '#333', fontWeight: '500', marginBottom: '4px', paddingRight: '20px' }}>{book.title}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Экз.: {book.copies} шт.</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА - КАТАЛОГ КНИГ */}
          <div style={{ flex: 1.5, minWidth: '500px' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '18px', margin: 0 }}>Каталог книг</h3>
                <button onClick={() => setFilterMenuOpen(!filterMenuOpen)} style={{ padding: '8px 16px', backgroundColor: filterMenuOpen ? '#fff' : '#3636FF', border: filterMenuOpen ? '1px solid #3636FF' : 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: filterMenuOpen ? '#3636FF' : '#fff' }}>Фильтр {filterMenuOpen ? '▲' : '▼'}</button>
              </div>

              {filterMenuOpen && (
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #eee' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                    <div><label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Год издания</label><div style={{ display: 'flex', gap: '8px' }}><input type="text" placeholder="От" value={filterYearFrom} onChange={(e) => setFilterYearFrom(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /><input type="text" placeholder="До" value={filterYearTo} onChange={(e) => setFilterYearTo(e.target.value)} style={{ width: '50%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /></div></div>
                    <div><label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>ISBN</label><input type="text" placeholder="978-5-..." value={filterIsbn} onChange={(e) => setFilterIsbn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
                    <div><label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>ББК</label><input type="text" placeholder="У92-05" value={filterBbk} onChange={(e) => setFilterBbk(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
                    <div><label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Рубрики</label><div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><input type="text" placeholder="Введите рубрику" value={rubricInput} onChange={(e) => setRubricInput(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /><button onClick={handleAddRubric} style={{ padding: '8px 16px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+</button></div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{rubrics.map((item, idx) => (<span key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.08)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#3636FF' }}>{item} <button onClick={() => handleRemoveItem(setRubrics, rubrics, idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', marginLeft: '6px' }}>✕</button></span>))}</div></div>
                    <div><label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Персоналии</label><div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><input type="text" placeholder="Введите персоналию" value={personInput} onChange={(e) => setPersonInput(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /><button onClick={handleAddPerson} style={{ padding: '8px 16px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+</button></div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{persons.map((item, idx) => (<span key={idx} style={{ backgroundColor: 'rgba(255,152,0,0.1)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#e65100' }}>{item} <button onClick={() => handleRemoveItem(setPersons, persons, idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', marginLeft: '6px' }}>✕</button></span>))}</div></div>
                    <div><label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#666' }}>Серии</label><div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><input type="text" placeholder="Введите серию" value={seriesInput} onChange={(e) => setSeriesInput(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /><button onClick={handleAddSeries} style={{ padding: '8px 16px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+</button></div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{series.map((item, idx) => (<span key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.08)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#3636FF' }}>{item} <button onClick={() => handleRemoveItem(setSeries, series, idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', marginLeft: '6px' }}>✕</button></span>))}</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}><button onClick={applyFilters} style={{ padding: '8px 20px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Применить</button><button onClick={resetFilters} style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Сбросить</button></div>
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <input type="text" placeholder="Поиск по каталогу..." value={searchCatalogTerm} onChange={(e) => setSearchCatalogTerm(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
              </div>

              <div style={{ overflowX: 'auto', maxHeight: '450px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee', position: 'sticky', top: 0 }}>
                      <th style={{ padding: '12px', textAlign: 'left', width: '40px' }}></th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Инв. позиция</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>ББК</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Книга</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontSize: '13px' }}>Экз.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCatalogBooks.map(book => {
                      return (
                        <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px' }}>
                            <input type="checkbox" checked={selectedBooks.some(b => b.id === book.id)} onChange={() => toggleBookSelection(book)} />
                            </td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>{book.invNumber}</td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>{book.bbk}</td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#333', maxWidth: '350px' }}>{book.title}</td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>{book.copies} шт.</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '30px', flexDirection: 'column' }}>
          <button onClick={handleSubmit} style={{ width: '100%', padding: '12px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Сохранить запись</button>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>Отмена</button>
        </div>

      </div>
    </div>
  )
}

export default AddSupplyModal