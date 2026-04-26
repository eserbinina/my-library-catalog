import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function EditBook() {
  const { id } = useParams()
  
  // ВРЕМЕННЫЕ ДАННЫЕ (потом будут с сервера)
  const [formData, setFormData] = useState({
    resourceType: "Текст",
    bbk: "У9246",
    mainTitle: "Война и мир",
    parallelTitle: "War and Peace",
    additionalTitle: "роман-эпопея",
    responsibility: "Л. Н. Толстой",
    partNumbers: ["Том 1", "Том 2", "Том 3"],
    edition: "5-е изд.",
    additionalEdition: "перераб.",
    placeOfPublication: "Москва",
    yearOfPublication: "2020",
    pages: "1274",
    isbn: "978-5-280-03824-4",
    accessDate: "2024-01-15",
    notes: "Классика русской литературы",
    bibliography: "Библиогр.: с. 1200-1250",
    accessUrl: "http://library.aasc.ru/books/war-and-peace",
    accessRestriction: "Свободный доступ",
    contentType: "Монография",
    mediaType: "Печатный",
    language: "Русский",
    source: "Титульный лист",
    rubrics: ["Художественная литература", "Русская проза XIX века"],
    keywords: ["война 1812 года", "русская литература", "исторический роман"],
    persons: ["Толстой Лев Николаевич"],
    series: "Русская классика",
    seriesNumber: "12",
    support: "Золотой фонд",
    contributors: [{ name: "Иванов И.И.", role: "Редактор", inTitle: true, inDescription: false }],
    publishers: ["Художественная литература"],
    seriesList: [{ name: "Русская классика", number: "12" }],
    identifiers: [{ type: "ISBN", value: "978-5-280-03824-4" }],
    inventoryList: [],
    coverPreview: null,
    branches: [
      { name: "Центральный корпус", count: 3 },
      { name: "Корпус №2", count: 1 },
      { name: "Корпус №3", count: 0 }
    ]
  })

  // Состояния для выпадающих окон
  const [showContributorForm, setShowContributorForm] = useState(false)
  const [showPublisherForm, setShowPublisherForm] = useState(false)
  const [showSeriesForm, setShowSeriesForm] = useState(false)
  const [showIdentifierForm, setShowIdentifierForm] = useState(false)
  const [showInventoryForm, setShowInventoryForm] = useState(false)
  
  // Временные данные для форм
  const [tempContributor, setTempContributor] = useState({ name: "", role: "", inTitle: false, inDescription: false })
  const [tempPublisher, setTempPublisher] = useState("")
  const [tempSeries, setTempSeries] = useState({ name: "", number: "" })
  const [tempIdentifier, setTempIdentifier] = useState({ type: "", value: "" })
  const [tempInventory, setTempInventory] = useState({
    location: "",
    number: "",
    authorMark: "",
    year: "",
    count: "",
    price: "",
    active: false
  })

  const [partInput, setPartInput] = useState('')
  const [rubricInput, setRubricInput] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [personInput, setPersonInput] = useState('')
  const [contributorName, setContributorName] = useState('')
  const [contributorRole, setContributorRole] = useState('')
  const [publisherInput, setPublisherInput] = useState('')

  const handleAddPart = () => {
    if (partInput.trim()) {
      setFormData({ ...formData, partNumbers: [...formData.partNumbers, partInput] })
      setPartInput('')
    }
  }

  const handleAddRubric = () => {
    if (rubricInput.trim()) {
      setFormData({ ...formData, rubrics: [...formData.rubrics, rubricInput] })
      setRubricInput('')
    }
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData({ ...formData, keywords: [...formData.keywords, keywordInput] })
      setKeywordInput('')
    }
  }

  const handleAddPerson = () => {
    if (personInput.trim()) {
      setFormData({ ...formData, persons: [...formData.persons, personInput] })
      setPersonInput('')
    }
  }

  const handleAddContributor = () => {
    if (tempContributor.name.trim()) {
      setFormData({ 
        ...formData, 
        contributors: [...formData.contributors, { 
          name: tempContributor.name, 
          role: tempContributor.role,
          inTitle: tempContributor.inTitle || false,
          inDescription: tempContributor.inDescription || false
        }] 
      })
      setTempContributor({ name: "", role: "", inTitle: false, inDescription: false })
      setShowContributorForm(false)
    }
  }

  const handleAddPublisherFromForm = () => {
    if (tempPublisher.trim()) {
      setFormData({ ...formData, publishers: [...formData.publishers, tempPublisher] })
      setTempPublisher("")
      setShowPublisherForm(false)
    }
  }

  const handleAddSeriesFromForm = () => {
    if (tempSeries.name.trim()) {
      setFormData({ 
        ...formData, 
        seriesList: [...formData.seriesList, { name: tempSeries.name, number: tempSeries.number }] 
      })
      setTempSeries({ name: "", number: "" })
      setShowSeriesForm(false)
    }
  }

  const handleAddIdentifierFromForm = () => {
    if (tempIdentifier.value.trim()) {
      setFormData({ 
        ...formData, 
        identifiers: [...formData.identifiers, { type: tempIdentifier.type || "ISBN", value: tempIdentifier.value }] 
      })
      setTempIdentifier({ type: "", value: "" })
      setShowIdentifierForm(false)
    }
  }

  const handleAddInventory = () => {
    if (tempInventory.number.trim()) {
      setFormData({ 
        ...formData, 
        inventoryList: [...(formData.inventoryList || []), { ...tempInventory }] 
      })
      setTempInventory({
        location: "",
        number: "",
        authorMark: "",
        year: "",
        count: "",
        price: "",
        active: false
      })
      setShowInventoryForm(false)
    } else {
      alert('Заполните инвентарный номер')
    }
  }

  const handleCoverFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение (JPG или PNG)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 10 МБ')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      setFormData({ ...formData, coverPreview: e.target.result })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveItem = (field, index) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) })
  }

  const handleBranchChange = (index, count) => {
    const newBranches = [...formData.branches]
    newBranches[index].count = parseInt(count) || 0
    setFormData({ ...formData, branches: newBranches })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Изменённые данные книги:', formData)
    alert('Изменения сохранены (заглушка)')
  }

  const InnerCard = ({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>{title}</h2>
      {children}
    </div>
  )

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* ШАПКА */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <img 
          src="/images/profile-icon.png" 
          alt="Профиль" 
          style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
        />
        <div>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Редактирование книги</h1>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        <Link to="/librarian/manage-catalog" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>
          ← Назад к управлению каталогом
        </Link>

        <form onSubmit={handleSubmit}>
          
          
          {/* БОЛЬШАЯ РАМКА "БИБЛИОГРАФИЧЕСКАЯ ЗАПИСЬ" */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '20px', 
            border: '1px solid #ddd', 
            padding: '24px', 
            marginBottom: '20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
          }}>
            
            <h1 style={{ fontSize: '22px', fontWeight: '600', margin: '0 0 20px 0', color: '#1a1a1a', paddingBottom: '12px', borderBottom: '2px solid #3636FF', display: 'inline-block' }}>
              Библиографическая запись
            </h1>

            {/* ПОЛЯ ВЕРХНЕЙ ЧАСТИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              
              <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Тип ресурса</div>
                  <input 
                    type="text" 
                    value={formData.resourceType} 
                    onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })} 
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Индекс ББК</div>
                  <input 
                    type="text" 
                    value={formData.bbk} 
                    onChange={(e) => setFormData({ ...formData, bbk: e.target.value })} 
                    placeholder="У9246"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Основное заглавие *</div>
                <input 
                  type="text" 
                  value={formData.mainTitle} 
                  onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })} 
                  placeholder="Война и мир"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Параллельное заглавие</div>
                <input 
                  type="text" 
                  value={formData.parallelTitle} 
                  onChange={(e) => setFormData({ ...formData, parallelTitle: e.target.value })} 
                  placeholder="War and Peace"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Доп. сведения к заглавию</div>
                <input 
                  type="text" 
                  value={formData.additionalTitle} 
                  onChange={(e) => setFormData({ ...formData, additionalTitle: e.target.value })} 
                  placeholder="роман"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Сведения об ответственности (текст)</div>
                <input 
                  type="text" 
                  value={formData.responsibility} 
                  onChange={(e) => setFormData({ ...formData, responsibility: e.target.value })} 
                  placeholder="Л. Н. Толстой; перевод с французского..."
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                />
              </div>
            </div>

            {/* НОМЕР ЧАСТИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Номер части</div>
                  <input 
                    type="text" 
                    placeholder="Том 1"
                    value={partInput}
                    onChange={(e) => setPartInput(e.target.value)}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Название части</div>
                  <input 
                    type="text" 
                    placeholder="Введите название части"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.partNumbers.map((part, idx) => (
                  <span key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#3636FF' }}>
                    {part} <button type="button" onClick={() => handleRemoveItem('partNumbers', idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', marginLeft: '6px' }}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            {/* ИЗДАТЕЛЬСКАЯ ИНФОРМАЦИЯ */}
            <InnerCard title="Издательская информация">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div><div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Сведения об издании</div><input type="text" value={formData.edition} onChange={(e) => setFormData({ ...formData, edition: e.target.value })} placeholder="5-е изд." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} /></div>
                <div><div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Доп. сведения об издании</div><input type="text" value={formData.additionalEdition} onChange={(e) => setFormData({ ...formData, additionalEdition: e.target.value })} placeholder="испр. и доп." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} /></div>
                <div><div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Место издания</div><input type="text" value={formData.placeOfPublication} onChange={(e) => setFormData({ ...formData, placeOfPublication: e.target.value })} placeholder="Москва" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} /></div>
                <div><div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Год издания</div><input type="text" value={formData.yearOfPublication} onChange={(e) => setFormData({ ...formData, yearOfPublication: e.target.value })} placeholder="2022" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} /></div>
                <div><div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Количество страниц</div><input type="text" value={formData.pages} onChange={(e) => setFormData({ ...formData, pages: e.target.value })} placeholder="1274" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} /></div>
                <div><div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Сопроводительный материал</div><input type="text" value={formData.supplementaryMaterial || ''} onChange={(e) => setFormData({ ...formData, supplementaryMaterial: e.target.value })} placeholder="ил., карты" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} /></div>
              </div>
            </InnerCard>

            {/* ПРИМЕЧАНИЯ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Примечания</div>
                <textarea rows="3" placeholder="Введите примечания" value={formData.notes || ''} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Библиография</div>
                <input type="text" placeholder="Библиогр.: с. 1200-1250" value={formData.bibliography || ''} onChange={(e) => setFormData({ ...formData, bibliography: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
              </div>
            </div>

            {/* ДОСТУП И НОСИТЕЛЬ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>URL доступа</div>
                <input type="text" placeholder="https://example.com/book" value={formData.accessUrl || ''} onChange={(e) => setFormData({ ...formData, accessUrl: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Ограничение доступа</div>
                  <input type="text" placeholder="Свободный доступ" value={formData.accessRestriction || ''} onChange={(e) => setFormData({ ...formData, accessRestriction: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Дата обращения</div>
                  <input type="text" value={formData.accessDate || ''} onChange={(e) => setFormData({ ...formData, accessDate: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Вид содержания</div>
                  <select 
                    value={formData.contentType || ''}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', backgroundColor: '#fff' }}
                  >
                    <option value="">Выберите вид</option>
                    <option value="Монография">Монография</option>
                    <option value="Учебник">Учебник</option>
                    <option value="Словарь">Словарь</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Тип носителя</div>
                  <select 
                    value={formData.mediaType || ''}
                    onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', backgroundColor: '#fff' }}
                  >
                    <option value="">Выберите тип</option>
                    <option value="Печатный">Печатный</option>
                    <option value="Электронный">Электронный</option>
                    <option value="Аудио">Аудио</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Язык</div>
                  <input type="text" placeholder="Русский" value={formData.language || ''} onChange={(e) => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Источник описания</div>
                  <input type="text" placeholder="Титульный лист" value={formData.source || ''} onChange={(e) => setFormData({ ...formData, source: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                </div>
              </div>
            </div>

            {/* ОТВЕТСТВЕННЫЕ ЛИЦА */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#1a1a1a' }}>Ответственные лица</h2>
                <button 
                  type="button" 
                  onClick={() => setShowContributorForm(!showContributorForm)} 
                  style={{ 
                    padding: '6px 16px', 
                    backgroundColor: showContributorForm ? '#ccc' : '#3636FF', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontSize: '13px' 
                  }}
                >+ Добавить</button>
              </div>
              {showContributorForm && (
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #eee' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <input 
                      type="text" 
                      placeholder="Имя участника"
                      value={tempContributor.name}
                      onChange={(e) => setTempContributor({ ...tempContributor, name: e.target.value })}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <select 
                      value={tempContributor.role}
                      onChange={(e) => setTempContributor({ ...tempContributor, role: e.target.value })}
                      style={{ width: '50%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', backgroundColor: '#fff' }}
                    >
                      <option value="">Выберите роль</option>
                      <option value="Автор">Автор</option>
                      <option value="Редактор">Редактор</option>
                      <option value="Переводчик">Переводчик</option>
                      <option value="Художник">Художник</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#333' }}>
                      <input 
                        type="checkbox" 
                        checked={tempContributor.inTitle === true}
                        onChange={(e) => {
                          setTempContributor({ ...tempContributor, inTitle: e.target.checked, inDescription: false })
                        }}
                      /> В заголовке
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#333' }}>
                      <input 
                        type="checkbox" 
                        checked={tempContributor.inDescription === true}
                        onChange={(e) => {
                          setTempContributor({ ...tempContributor, inDescription: e.target.checked, inTitle: false })
                        }}
                      /> В описании
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowContributorForm(false)} style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Отмена</button>
                    <button type="button" onClick={handleAddContributor} style={{ padding: '6px 12px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Сохранить</button>
                  </div>
                </div>
              )}
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#999', fontSize: '13px', textAlign: 'center' }}>Нажмите "Добавить" для добавления ответственного лица</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formData.contributors.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#333', fontSize: '14px' }}>{item.name} ({item.role}) {item.inTitle && '[В заголовке]'}{item.inDescription && '[В описании]'}</span>
                    <button type="button" onClick={() => handleRemoveItem('contributors', idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ИЗДАТЕЛИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#1a1a1a' }}>Издатели</h2>
                <button 
                  type="button" 
                  onClick={() => setShowPublisherForm(!showPublisherForm)} 
                  style={{ 
                    padding: '6px 16px', 
                    backgroundColor: showPublisherForm ? '#ccc' : '#3636FF', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontSize: '13px' 
                  }}
                >+ Добавить</button>
              </div>
              {showPublisherForm && (
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #eee' }}>
                  <input type="text" placeholder="Эксмо" value={tempPublisher} onChange={(e) => setTempPublisher(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', marginBottom: '12px' }} />
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowPublisherForm(false)} style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Отмена</button>
                    <button type="button" onClick={handleAddPublisherFromForm} style={{ padding: '6px 12px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Сохранить</button>
                  </div>
                </div>
              )}
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#999', fontSize: '13px', textAlign: 'center' }}>Нажмите "Добавить" для добавления издателя</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.publishers.map((item, idx) => (
                  <span key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#3636FF' }}>
                    {item} <button type="button" onClick={() => handleRemoveItem('publishers', idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', marginLeft: '6px' }}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            {/* СЕРИИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#1a1a1a' }}>Серии</h2>
                <button 
                  type="button" 
                  onClick={() => setShowSeriesForm(!showSeriesForm)} 
                  style={{ 
                    padding: '6px 16px', 
                    backgroundColor: showSeriesForm ? '#ccc' : '#3636FF', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontSize: '13px' 
                  }}
                >+ Добавить</button>
              </div>
              {showSeriesForm && (
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Название серии</div>
                      <input type="text" placeholder="Русская классика" value={tempSeries.name} onChange={(e) => setTempSeries({ ...tempSeries, name: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Номер выпуска</div>
                      <input type="text" placeholder="12" value={tempSeries.number} onChange={(e) => setTempSeries({ ...tempSeries, number: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowSeriesForm(false)} style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Отмена</button>
                    <button type="button" onClick={handleAddSeriesFromForm} style={{ padding: '6px 12px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Сохранить</button>
                  </div>
                </div>
              )}
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#999', fontSize: '13px', textAlign: 'center' }}>Нажмите "Добавить" для добавления серии</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formData.seriesList?.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#333', fontSize: '14px' }}>{item.name} (№{item.number})</span>
                    <button type="button" onClick={() => handleRemoveItem('seriesList', idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ИДЕНТИФИКАТОРЫ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#1a1a1a' }}>Идентификаторы</h2>
                <button 
                  type="button" 
                  onClick={() => setShowIdentifierForm(!showIdentifierForm)} 
                  style={{ 
                    padding: '6px 16px', 
                    backgroundColor: showIdentifierForm ? '#ccc' : '#3636FF', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontSize: '13px' 
                  }}
                >+ Добавить</button>
              </div>
              {showIdentifierForm && (
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Тип</div>
                      <select 
                        value={tempIdentifier.type}
                        onChange={(e) => setTempIdentifier({ ...tempIdentifier, type: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
                      >
                        <option value="">Выберите тип</option>
                        <option value="ISBN">ISBN</option>
                        <option value="ISSN">ISSN</option>
                        <option value="DOI">DOI</option>
                        <option value="УДК">УДК</option>
                        <option value="ББК">ББК</option>
                      </select>
                    </div>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Значение</div>
                      <input type="text" placeholder="979-5-699-12345-6" value={tempIdentifier.value} onChange={(e) => setTempIdentifier({ ...tempIdentifier, value: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowIdentifierForm(false)} style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Отмена</button>
                    <button type="button" onClick={handleAddIdentifierFromForm} style={{ padding: '6px 12px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Сохранить</button>
                  </div>
                </div>
              )}
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#999', fontSize: '13px', textAlign: 'center' }}>Нажмите "Добавить" для добавления идентификатора</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formData.identifiers?.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#333', fontSize: '14px' }}>{item.type}: {item.value}</span>
                    <button type="button" onClick={() => handleRemoveItem('identifiers', idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* РУБРИКИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Рубрики</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Введите рубрику"
                    value={rubricInput}
                    onChange={(e) => setRubricInput(e.target.value)}
                    style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                  />
                  <button 
                    type="button" 
                    onClick={handleAddRubric} 
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#3636FF',
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer'
                    }}
                  >+</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.rubrics.map((item, idx) => (
                    <span key={idx} style={{ 
                      backgroundColor: 'rgba(54, 54, 255, 0.08)', 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '13px', 
                      color: '#3636FF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {item} 
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItem('rubrics', idx)} 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#3636FF', 
                          cursor: 'pointer', 
                          fontSize: '14px',
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >✕</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* КЛЮЧЕВЫЕ СЛОВА */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Ключевые слова</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Введите ключевое слово"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                  />
                  <button 
                    type="button" 
                    onClick={handleAddKeyword} 
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#3636FF',
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer'
                    }}
                  >+</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.keywords.map((item, idx) => (
                    <span key={idx} style={{ 
                      backgroundColor: 'rgba(46, 125, 50, 0.1)', 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '13px', 
                      color: '#2e7d32',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {item} 
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItem('keywords', idx)} 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#2e7d32', 
                          cursor: 'pointer', 
                          fontSize: '14px',
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >✕</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ПЕРСОНАЛИИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Персоналии</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Введите персоналию"
                    value={personInput}
                    onChange={(e) => setPersonInput(e.target.value)}
                    style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} 
                  />
                  <button 
                    type="button" 
                    onClick={handleAddPerson} 
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#3636FF',
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer'
                    }}
                  >+</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.persons.map((item, idx) => (
                    <span key={idx} style={{ 
                      backgroundColor: 'rgba(255, 152, 0, 0.1)', 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '13px', 
                      color: '#e65100',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {item} 
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItem('persons', idx)} 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#e65100', 
                          cursor: 'pointer', 
                          fontSize: '14px',
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >✕</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ИНВЕНТАРНЫЕ ПОЗИЦИИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#1a1a1a' }}>Инвентарные позиции</h2>
                <button 
                  type="button" 
                  onClick={() => setShowInventoryForm(!showInventoryForm)} 
                  style={{ 
                    padding: '6px 16px', 
                    backgroundColor: showInventoryForm ? '#ccc' : '#3636FF', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontSize: '13px' 
                  }}
                >+ Добавить позицию</button>
              </div>
              
              {showInventoryForm && (
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #eee' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Место хранения</div>
                      <select 
                        value={tempInventory.location}
                        onChange={(e) => setTempInventory({ ...tempInventory, location: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
                      >
                        <option value="">Выберите</option>
                        <option value="Центральный корпус">Центральный корпус</option>
                        <option value="Корпус №2">Корпус №2</option>
                        <option value="Корпус №3">Корпус №3</option>
                      </select>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Инв. номер</div>
                      <input 
                        type="text" 
                        placeholder="123456"
                        value={tempInventory.number}
                        onChange={(e) => setTempInventory({ ...tempInventory, number: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} 
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Авторский знак</div>
                      <input 
                        type="text" 
                        placeholder="T65"
                        value={tempInventory.authorMark}
                        onChange={(e) => setTempInventory({ ...tempInventory, authorMark: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} 
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Год поступления</div>
                      <input 
                        type="text" 
                        placeholder="2020"
                        value={tempInventory.year}
                        onChange={(e) => setTempInventory({ ...tempInventory, year: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} 
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Кол-во экз.</div>
                      <input 
                        type="number" 
                        placeholder="5"
                        value={tempInventory.count}
                        onChange={(e) => setTempInventory({ ...tempInventory, count: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} 
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Цена</div>
                      <input 
                        type="text" 
                        placeholder="500.00"
                        value={tempInventory.price}
                        onChange={(e) => setTempInventory({ ...tempInventory, price: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} 
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#333' }}>
                      <input 
                        type="checkbox" 
                        checked={tempInventory.active || false}
                        onChange={(e) => setTempInventory({ ...tempInventory, active: e.target.checked })}
                      /> Активна
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowInventoryForm(false)} style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Отмена</button>
                    <button type="button" onClick={handleAddInventory} style={{ padding: '6px 12px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Сохранить</button>
                  </div>
                </div>
              )}
              
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#999', fontSize: '13px', textAlign: 'center' }}>Нажмите "Добавить позицию" для добавления инвентарной позиции</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formData.inventoryList?.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#333', fontSize: '14px' }}>
                      {item.location || 'Нет места'} | Инв.№ {item.number} | {item.count || 0} экз. | {item.active ? 'Активна' : 'Не активна'}
                    </span>
                    <button type="button" onClick={() => handleRemoveItem('inventoryList', idx)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ИЗОБРАЖЕНИЕ ОБЛОЖКИ */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Изображение обложки</h2>
              <div 
                style={{ 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: '12px', 
                  padding: '40px 20px', 
                  border: '2px dashed #ddd', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                onClick={() => document.getElementById('coverUpload').click()}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#3636FF' }}
                onDragLeave={(e) => { e.currentTarget.style.borderColor = '#ddd' }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#ddd';
                  const file = e.dataTransfer.files[0];
                  if (file) handleCoverFile(file);
                }}
              >
                <input 
                  type="file" 
                  id="coverUpload" 
                  style={{ display: 'none' }} 
                  accept="image/jpeg,image/png"
                  onChange={(e) => {
                    if (e.target.files[0]) handleCoverFile(e.target.files[0]);
                  }}
                />
                {formData.coverPreview ? (
                  <img 
                    src={formData.coverPreview} 
                    alt="Обложка" 
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', marginBottom: '12px' }}
                  />
                ) : (
                  <img 
                    src="/images/upload-placeholder.png" 
                    alt="Загрузить обложку" 
                    style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '12px', opacity: 0.6 }} 
                  />
                )}
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  Перетащите фото сюда или нажмите для выбора
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  Поддерживаемые форматы: JPG, PNG. Макс. 10 МБ
                </div>
              </div>
            </div>

          </div>

          {/* КНОПКИ */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px', marginBottom: '40px' }}>
            <button type="submit" style={{ padding: '12px 32px', backgroundColor: '#3636FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
              Сохранить изменения
            </button>
            <Link to="/librarian/manage-catalog">
              <button type="button" style={{ padding: '12px 32px', backgroundColor: '#fff', color: '#3636FF', border: '1px solid #3636FF', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
                Отмена
              </button>
            </Link>
          </div>

        </form>
      </div>

      {/* ФУТЕР */}
      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p>Библиотека ААСК — Электронный библиотечный каталог</p>
          <p>© 2026 Колледж ААСК. Все права защищены</p>
        </div>
      </footer>
    </div>
  )
}

export default EditBook